const db = require('./oracle')
const express = require('express')
const app = express()
const port = 3500

process.on('SIGINT', function () {
    process.exit();
});


app.get('/lookup', (req, res) => {
    location = req.query.location === "1" ? 'Berlin' : req.query.location === "2" ? 'Barcelona' : 'Madrid';
    guests = isNaN(parseInt(req.query.guests)) ? 0 : parseInt(req.query.guests);
    db(`
    SELECT * from (SELECT distinct L.LISTING_ID, L.PICTURE_URL, L.NAME, L.SUMMARY, L.PRICE, L.LISTING_URL
        FROM LISTING L, CALENDAR C, LOCATION LOC
        WHERE C."date" BETWEEN TO_DATE(:startDate,'YYYY-MM-DD') AND TO_DATE(:endDate,'YYYY-MM-DD') and C.AVAILABLE = 1
          and C.LISTING_ID = L.LISTING_ID and LOC.CITY = :my_loc and LOC.LISTING_ID = L.LISTING_ID and L.GUESTS_INCLUDED > :my_gu)
        
        WHERE rownum <60
`, [req.query.startDate, req.query.endDate, location, guests], function (err, results) {
            if (!err) {
                res.send(results)
            }
        });
});

app.get('/search', (req, res) => {
    db(`
    SELECT * FROM (
        SELECT L.LISTING_ID, L.PICTURE_URL, L.NAME, L.SUMMARY, L.PRICE , L.LISTING_URL FROM LISTING L
            WHERE (L.NAME like :search_kw ) OR (L.SUMMARY like :search_kw ) OR (L.NOTES like :search_kw ))
      WHERE rownum <1000
`, [req.query.search.replace("_", " ") + '%'], function (err, results) {
            if (!err) {
                res.send(results)
            }
        });
});

app.get('/addHost', (req, res) => {

    db(`
    insert into HOST(host_id, host_name, host_since, host_about,  host_neighbourhood)
values (:host_id, :hostname,TO_DATE(:host_since,'YYYY-MM-DD'),:host_about,:host_neighbourhood)
`, [req.query.host_id, req.query.host_name.replace("_", " "), req.query.host_since, req.query.host_about.replace("_", " "), req.query.neighbourhood.replace("_", " ")], function (err, results) {
            if (!err) {
                res.send(results)
            }
            if (err) {
                res.send(err)
            }
        });
});

app.get('/addListing', (req, res) => {
    db(`
    insert into LISTING(LISTING_ID, HOST_ID, PRICE, NAME, SUMMARY)
values (:listing_id, :host_id,:host_price, :name ,:summary)

`, [req.query.listing_id, req.query.host_id, req.query.price, req.query.listing_name.replace("_", " "), req.query.summary.replace("_", " ")], function (err, results) {
            if (!err) {
                res.send(results)
            }
            if (err) {
                res.send(err)
            }
        });
});

app.get('/deleteHost', (req, res) => {
    if (!isNaN(req.query.listing_id)) {
        console.log("logged err");
        res.status(404);
    } else {
        db(`
    delete from HOST
where HOST_ID = :host_id
`,[req.query.host_id], function (err, results) {
                if (!err) {
                    res.send(results)
                }
                if (err) {
                    res.send(err)
                }
            });
    }
});

app.get('/deleteListing', (req, res) => {
    if (!isNaN(req.query.listing_id)) {
        console.log("logged err");
        res.status(404);
    } else {
        db(`
        delete from LISTING
    where LISTING_ID = :listing_id
    `,[req.query.listing_id], function (err, results) {
                if (!err) {
                    res.send(results)
                }
                if (err) {
                    res.send(err)
                }
            });
    }

});

app.get('/q1', (req, res) => {
    db(`
    SELECT AVG(LISTING.PRICE) from LISTING, APPARTMENT_DESCRIPTION
    WHERE LISTING.LISTING_ID = APPARTMENT_DESCRIPTION.LISTING_ID and APPARTMENT_DESCRIPTION.BEDROOMS = 8
`, [], function (err, results) {
            if (!err) {
                res.send(results)
            }
        });
});


app.get('/q2', (req, res) => {
    db(`
    SELECT AVG(REVIEW_SCORE.REVIEW_SCORES_CLEANLINESS) from REVIEW_SCORE, AMENITIES
    WHERE REVIEW_SCORE.LISTING_ID = AMENITIES.LISTING_ID and AMENITIES.TV = 1
`, [], function (err, results) {
            if (!err) {
                res.send(results)
            }
        });
});
app.get('/q3', (req, res) => {
    db(`
    SELECT DISTINCT H.HOST_ID, H.HOST_NAME from HOST H, LISTING L
    WHERE 1 = (SELECT MIN(C1.AVAILABLE) FROM CALENDAR C1 WHERE C1.LISTING_ID = L.LISTING_ID AND C1."date" BETWEEN TO_DATE('2019-03-01 00:00:00','YYYY-MM-DD HH24:MI:SS') AND TO_DATE('2019-09-30 00:00:00','YYYY-MM-DD HH24:MI:SS') GROUP BY C1.LISTING_ID)
    AND H.HOST_ID = L.HOST_ID
`, [], function (err, results) {
            if (!err) {
                res.send(results)
            }
        });
});

app.get('/q4', (req, res) => {
    db(`
    select  COUNT(*)
    from  LISTING L1, HOST H1
    where H1.HOST_ID IN (SELECT H2.HOST_ID FROM HOST H2, HOST H3 WHERE H2.HOST_NAME = H3.HOST_NAME AND H2.HOST_ID != H3.HOST_ID) AND L1.HOST_ID = H1.HOST_ID    
`, [], function (err, results) {
            if (!err) {
                res.send(results)
            }
        });
});
app.get('/q5', (req, res) => {
    db(`
    select DISTINCT CALENDAR."date"
    from CALENDAR, LISTING, HOST
    where HOST.HOST_NAME='Viajes Eco' and HOST.HOST_ID = LISTING.HOST_ID and LISTING.LISTING_ID = CALENDAR.LISTING_ID AND CALENDAR.AVAILABLE = 1
    order by CALENDAR."date"    
`, [], function (err, results) {
            if (!err) {
                res.send(results)
            }
        });
});
app.get('/q6', (req, res) => {
    db(`
    SELECT H.HOST_ID, H.HOST_NAME FROM HOST H
    WHERE H.HOST_ID NOT IN (SELECT L1.HOST_ID FROM LISTING L1, LISTING L2 WHERE L1.LISTING_ID != L2.LISTING_ID AND L1.HOST_ID = L2.HOST_ID)
`, [], function (err, results) {
            if (!err) {
                res.send(results)
            }
        });
});
app.get('/q7', (req, res) => {
    db(`
    SELECT (SELECT AVG(L.PRICE) FROM LISTING L, AMENITIES A WHERE  L.LISTING_ID = A.LISTING_ID AND A.WIFI = 1) -
       (SELECT AVG(L.PRICE) FROM LISTING L, AMENITIES A WHERE  L.LISTING_ID = A.LISTING_ID AND A.WIFI = 0) AS "Difference of price with and without wifi"
FROM DUAL    
`, [], function (err, results) {
            if (!err) {
                res.send(results)
            }
        });
});
app.get('/q8', (req, res) => {
    db(`
    SELECT (SELECT AVG(L.PRICE) from LISTING L, APPARTMENT_DESCRIPTION A, LOCATION LOC WHERE L.LISTING_ID = A.LISTING_ID AND A.BEDS = 8 AND L.LISTING_ID = LOC.LISTING_ID AND LOC.CITY = 'Berlin') -
    (SELECT AVG(L.PRICE) from LISTING L, APPARTMENT_DESCRIPTION A, LOCATION LOC WHERE L.LISTING_ID = A.LISTING_ID AND A.BEDS = 8 AND L.LISTING_ID = LOC.LISTING_ID AND LOC.CITY = 'Madrid') AS "Difference of price of 8 beds location in Berlin and Madrid"
FROM DUAL
`, [], function (err, results) {
            if (!err) {
                res.send(results)
            }
        });
});
app.get('/q9', (req, res) => {
    db(`
    SELECT HOS.HOST_ID, HOS.HOST_NAME FROM (SELECT L.HOST_ID, H.HOST_NAME FROM LISTING L, LOCATION LOC, HOST H WHERE L.LISTING_ID = LOC.LISTING_ID AND LOC.COUNTRY_CODE = 'ES' AND L.HOST_ID = H.HOST_ID GROUP BY L.HOST_ID, H.HOST_NAME ORDER BY COUNT(*) DESC) HOS WHERE ROWNUM <= 10
`, [], function (err, results) {
            if (!err) {
                res.send(results)
            }
        });
});
app.get('/q10', (req, res) => {
    db(`
    SELECT L.LISTING_ID, L.NAME FROM LISTING L, (SELECT APP.LISTING_ID FROM (SELECT R.LISTING_ID FROM REVIEW_SCORE R, LOCATION L WHERE L.LISTING_ID = R.LISTING_ID AND L.CITY = 'Barcelona' AND R.REVIEW_SCORES_RATING IS NOT NULL ORDER BY R.REVIEW_SCORES_RATING DESC) APP WHERE ROWNUM <= 10) LI
WHERE L.LISTING_ID = LI.LISTING_ID
`, [], function (err, results) {
            if (!err) {
                res.send(results)
            }
        });
});
app.get('/q11', (req, res) => {
    db(`
    SELECT COUNT(DISTINCT L.HOST_ID), LC.CITY FROM APPARTMENT_DESCRIPTION A, LISTING L, LOCATION LC
WHERE A.LISTING_ID = L.LISTING_ID AND A.SQUARE_FEET IS NOT NULL AND LC.LISTING_ID = A.LISTING_ID
GROUP BY LC.CITY ORDER BY COUNT(DISTINCT L.HOST_ID)    
`, [], function (err, results) {
            if (!err) {
                res.send(results)
            }
        });
});
app.get('/q12', (req, res) => {
    db(`
    SELECT CLASSEMENT.NEIGHBOURHOOD, REVIEW_SCORES_RATING FROM
(SELECT C.NEIGHBOURHOOD, REVIEW_SCORES_RATING FROM
(SELECT L.NEIGHBOURHOOD, COUNT(*) AS NUMB FROM REVIEW_SCORE R, LOCATION L WHERE L.CITY = 'Madrid' and L.LISTING_ID = R.LISTING_ID AND R.REVIEW_SCORES_RATING IS NOT NULL GROUP BY L.NEIGHBOURHOOD) C,
(SELECT L.NEIGHBOURHOOD, R.REVIEW_SCORES_RATING, (ROW_NUMBER() OVER (PARTITION BY L.NEIGHBOURHOOD ORDER BY R.REVIEW_SCORES_RATING)) AS ROWN FROM REVIEW_SCORE R, LOCATION L WHERE L.CITY = 'Madrid' and L.LISTING_ID = R.LISTING_ID AND R.REVIEW_SCORES_RATING IS NOT NULL ORDER BY L.NEIGHBOURHOOD, R.REVIEW_SCORES_RATING) G
WHERE G.NEIGHBOURHOOD = C.NEIGHBOURHOOD AND G.ROWN = (C.NUMB - MOD(C.NUMB, 2))/2
ORDER BY G.REVIEW_SCORES_RATING DESC) CLASSEMENT
WHERE ROWNUM <= 5
`, [], function (err, results) {
            if (!err) {
                res.send(results)
            }
        });
});
app.get('/q13', (req, res) => {
    db(`
    SELECT H.HOST_ID, H.HOST_NAME, COUNT(*) FROM HOST H, LISTING L WHERE L.HOST_ID = H.HOST_ID GROUP BY H.HOST_ID, H.HOST_NAME ORDER BY COUNT(*) DESC
`, [], function (err, results) {
            if (!err) {
                res.send(results)
            }
        });
});
app.get('/q14', (req, res) => {
    db(`
    SELECT LISTING_ID, NAME FROM (
        SELECT DISTINCT LST.LISTING_ID, LST.NAME FROM LISTING LST, LOCATION L, CALENDAR C1, APPARTMENT_DESCRIPTION A, REVIEW_SCORE R, VERIFICATIONS V
        WHERE LST.LISTING_ID = L.LISTING_ID AND C1.LISTING_ID = LST.LISTING_ID AND A.LISTING_ID = LST.LISTING_ID AND  R.LISTING_ID = LST.LISTING_ID AND L.CITY = 'Berlin' AND
              C1."date" BETWEEN TO_DATE('2019-03-01 00:00:00','YYYY-MM-DD HH24:MI:SS') AND TO_DATE('2019-04-30 23:59:59','YYYY-MM-DD HH24:MI:SS') AND 1 = C1.AVAILABLE
              AND LST.CANCELLATION_POLICY = 'flexible' AND A.BEDS >= 2 AND R.REVIEW_SCORES_LOCATION >= 8 AND V.HOST_ID = LST.HOST_ID AND V.GOVERNMENT_ID = 1
        ORDER BY (SELECT AVG(C2.PRICE) FROM CALENDAR C2 WHERE C2.LISTING_ID = LST.LISTING_ID AND C2.AVAILABLE = 1 AND C2."date" BETWEEN TO_DATE('2019-03-01 00:00:00','YYYY-MM-DD HH24:MI:SS') AND TO_DATE('2019-04-30 23:59:59','YYYY-MM-DD HH24:MI:SS'))
        ) WHERE ROWNUM <= 5    
`, [], function (err, results) {
            if (!err) {
                res.send(results)
            }
        });
});
app.get('/q15', (req, res) => {
    db(`
    SELECT LST.ACCOMMODATES, LST.LISTING_ID, LST.NAME, REVIEW_SCORES_RATING FROM(
        SELECT L.NAME, AD.LISTING_ID, AD.ACCOMMODATES,R.REVIEW_SCORES_RATING, (ROW_NUMBER() OVER (PARTITION BY AD.ACCOMMODATES ORDER BY R.REVIEW_SCORES_RATING DESC )) AS ROWN
        FROM LISTING L, REVIEW_SCORE R, APPARTMENT_DESCRIPTION AD, (SELECT A.LISTING_ID FROM AMENITIES A WHERE (A.WIFI + A.INTERNET + A.TV + A.FREE_STREET_PARKING) >= 2) APP
        WHERE R.LISTING_ID = APP.LISTING_ID AND AD.LISTING_ID = R.LISTING_ID AND L.LISTING_ID = R.LISTING_ID AND R.REVIEW_SCORES_RATING IS NOT NULL) LST
        WHERE ROWN <= 5    
`, [], function (err, results) {
            if (!err) {
                res.send(results)
            }
        });
});
app.get('/q16', (req, res) => {
    db(`
    SELECT C.HOST_ID, C.LISTING_ID, L2.NAME, NUMBER_OF_REVIEWS FROM (
        SELECT L.HOST_ID, L.LISTING_ID, COUNT(*) AS NUMBER_OF_REVIEWS, (ROW_NUMBER() OVER (PARTITION BY L.HOST_ID ORDER BY COUNT(*) DESC)) AS ROWN FROM REVIEWS R, LISTING L WHERE L.LISTING_ID = R.LISTING_ID GROUP BY L.HOST_ID, L.LISTING_ID) C, LISTING L2
        WHERE ROWN <= 3 AND L2.LISTING_ID = C.LISTING_ID    
`, function (err, results) {
            if (!err) {
                res.send(results)
            }
        });
});
app.get('/q17', (req, res) => {
    db(`
????
`, [], function (err, results) {
            if (!err) {
                res.send(results)
            }
        });
});
app.get('/q18', (req, res) => {
    db(`
    SELECT  SUM(AVG_COMMUNICATION_SCORE) AS DIFF_AVG_COMMUNICATION_REV_SCORE FROM (
        SELECT AVG(REVIEW_SCORES_COMMUNICATION) AS AVG_COMMUNICATION_SCORE FROM LISTING L, REVIEW_SCORE R WHERE R.LISTING_ID = L.LISTING_ID AND L.HOST_ID = (
        SELECT HOST_ID FROM VERIFICATIONS V
        GROUP BY HOST_ID
        ORDER BY MAX(V.REVIEWS + V.FACEBOOK + V.MANUAL_ONLINE + V.WEIBO + + V.PHOTOGRAPHER +
                             V.GOOGLE + V.SENT_ID + V.IDENTITY_MANUAL + V.GOVERNMENT_ID +
                             V.EMAIL + V.PHONE + V.ZHIMA_SELFIE + V.KBA + V.OFFLINE_GOVERNMENT_ID + V.WORK_EMAIL
                             + V.MANUAL_OFFLINE + V.SESAME_OFFLINE + V.JUMIO + V.SELFIE + V.SESAME ) DESC
        FETCH FIRST 1 ROW ONLY
        ) UNION ALL
        SELECT -AVG(REVIEW_SCORES_COMMUNICATION) AS AVG_COMMUNICATION_SCORE FROM LISTING L, REVIEW_SCORE R WHERE R.LISTING_ID = L.LISTING_ID AND L.HOST_ID = (
        SELECT HOST_ID FROM VERIFICATIONS V
        GROUP BY HOST_ID
        ORDER BY MAX(V.REVIEWS + V.FACEBOOK + V.MANUAL_ONLINE + V.WEIBO + + V.PHOTOGRAPHER +
                             V.GOOGLE + V.SENT_ID + V.IDENTITY_MANUAL + V.GOVERNMENT_ID +
                             V.EMAIL + V.PHONE + V.ZHIMA_SELFIE + V.KBA + V.OFFLINE_GOVERNMENT_ID + V.WORK_EMAIL
                             + V.MANUAL_OFFLINE + V.SESAME_OFFLINE + V.JUMIO + V.SELFIE + V.SESAME)
        FETCH FIRST 1 ROW ONLY
        ))    
`, [], function (err, results) {
            if (!err) {
                res.send(results)
            }
        });
});
app.get('/q19', (req, res) => {
    db(`
    SELECT CITY FROM (
        SELECT L.CITY, COUNT(*) AS NUMBER_OF_REVIEWS FROM LOCATION L, APPARTMENT_DESCRIPTION AD, REVIEWS R
        WHERE R.LISTING_ID = L.LISTING_ID AND AD.LISTING_ID = L.LISTING_ID AND
        AD.ROOM_TYPE IN (
          SELECT AD2.ROOM_TYPE
          FROM APPARTMENT_DESCRIPTION AD2
          HAVING AVG(AD2.ACCOMMODATES) > 3
          GROUP BY AD2.ROOM_TYPE
        )
        GROUP BY L.CITY
        ORDER BY NUMBER_OF_REVIEWS DESC
        ) WHERE ROWNUM <= 1    
`, [], function (err, results) {
            if (!err) {
                res.send(results)
            }
        });
});
app.get('/q20', (req, res) => {
    db(`
    SELECT L.NEIGHBOURHOOD FROM LOCATION L, LISTING LST, CALENDAR C
WHERE L.LISTING_ID = LST.LISTING_ID AND C.LISTING_ID = LST.LISTING_ID AND L.CITY = 'Madrid'
  AND LST.HOST_ID IN (SELECT H.HOST_ID FROM HOST H WHERE H.HOST_SINCE <=  TO_DATE('2017-06-01 23:59:59','YYYY-MM-DD HH24:MI:SS'))
AND C."date" BETWEEN TO_DATE('2019-01-01 00:00:00','YYYY-MM-DD HH24:MI:SS') AND TO_DATE('2019-12-31 23:59:59','YYYY-MM-DD HH24:MI:SS')
HAVING (COUNT(CASE WHEN 1 = C.AVAILABLE  THEN 1 ELSE NULL END) * 100 /
       COUNT(*)) > 50
GROUP BY L.NEIGHBOURHOOD
ORDER BY L.NEIGHBOURHOOD    
`, [], function (err, results) {
            if (!err) {
                res.send(results)
            }
        });
});
app.get('/q21', (req, res) => {
    db(`
    SELECT L.COUNTRY FROM LOCATION L, LISTING LST, CALENDAR C
WHERE L.LISTING_ID = LST.LISTING_ID AND C.LISTING_ID = LST.LISTING_ID AND C."date" BETWEEN TO_DATE('2018-01-01 00:00:00','YYYY-MM-DD HH24:MI:SS') AND TO_DATE('2018-12-31 23:59:59','YYYY-MM-DD HH24:MI:SS')
HAVING COUNT(CASE WHEN 1 = C.AVAILABLE  THEN 1 ELSE NULL END) * 100 /
       COUNT(*) > 20
GROUP BY L.COUNTRY
ORDER BY L.COUNTRY    
`, [], function (err, results) {
            if (!err) {
                res.send(results)
            }
        });
});
app.get('/q22', (req, res) => {
    db(`
    SELECT L.NEIGHBOURHOOD FROM LOCATION L, LISTING LST
  WHERE L.CITY = 'Barcelona' AND L.LISTING_ID = LST.LISTING_ID
  HAVING COUNT(CASE LST.CANCELLATION_POLICY WHEN 'strict_14_with_grace_period' THEN 1 ELSE NULL END) * 100 / COUNT(*) > 5
  GROUP BY L.NEIGHBOURHOOD ORDER BY L.NEIGHBOURHOOD    
`, [], function (err, results) {
            if (!err) {
                res.send(results)
            }
        });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));