/*Уникальность по двум колонкам*/
ALTER TABLE dbo.versions_data
ADD CONSTRAINT uq_versions_data UNIQUE(element_id, field_id, version_id)

/*Пример JOIN*/
select * from field_values fv JOIN fields f ON fv.field_id = f.ID


/*Создаем каталог и определяем его поля */
DECLARE @fieldList dbo.FieldList

INSERT INTO @fieldList (FieldName, FieldType) VALUES
('string_field', 0),
('bool_field', 1),
('int_field', 2),
('date_field', 3)

EXEC dbo.Create_Catalog 'first_cat', @fieldList 

/*Заполняем поля каталога*/

DECLARE @list dbo.ValueList


INSERT INTO @list (StringVal, BoolVal, IntVal, DateVal, FieldId, ID) VALUES
('stringVal', null, null, null, 1, 0),
(null, 0, null, null, 2, 0),
(null, null, 11, null, 3, 0),
(null, null, null, '20120618 10:34:09 AM', 4, 0)

DECLARE @return_status INT;
EXEC @return_status = Save_Values @list, 1;
SELECT @return_status