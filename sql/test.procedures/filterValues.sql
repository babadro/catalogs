/*
	Смысл прост:
	сначала запрашиваем все значения (ячейки), которые удовлетворяют условиям.
	Но группируем их по element_id.
	А потом из результата получаем те element_id, которые встретились в предыдущем запросе столько раз, сколько
	условий было (сколько колонок было отфильтровано).
	Именно эти element_id нам и нужны.
	Дальше просто делаем джоин из field_values по element_id
*/
SELECT * FROM field_values INNER JOIN
(
	SELECT element_id FROM (
		SELECT element_id, count(*) AS countNum FROM field_values
		WHERE
		field_id = 1 AND string_val LIKE '%stringVal%'
		OR
		field_id = 2 AND bool_val = 1
		OR
		field_id = 3 AND int_val >= 8 AND int_val <= 10
		OR
		field_id = 4 AND date_val >= '2012-06-17' AND date_val <= '2012-06-19'
		GROUP BY element_id
	) AS el
	WHERE el.countNum = 4
) AS t
ON field_values.element_id = t.element_id