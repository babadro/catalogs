SELECT cat.catalog_name, cat.ID AS catalogId, ver.version_name, ver.ID AS versionId FROM
(SELECT * FROM catalogs) cat
LEFT JOIN
(SELECT * FROM versions) ver
ON
cat.ID = ver.catalog_id