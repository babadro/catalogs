using System;
using System.Collections.Generic;
using System.Text;

namespace DomainCore
{
    public class CatalogDto
    {
        //Dapper constructor
        public CatalogDto(int val_id, string string_val, bool bool_val, int int_val, DateTime date_val, int element_id, int field_id,
            string field_name, FieldType field_type)
        {
            ValueId = val_id;
            StringVal = string_val;
            BoolVal = bool_val;
            IntVal = int_val;
            DateVal = date_val;
            ElementId = element_id;
            FieldId = field_id;
            FieldName = field_name;
            FieldType = field_type;
        }
        public int ValueId { get; }
        public string StringVal { get; }

        public bool BoolVal { get; }
        
        public int IntVal { get; }

        public DateTime DateVal { get; set; }
        public int ElementId { get; }

        public int FieldId { get; }

        public string FieldName { get; }

        public FieldType FieldType { get; }

    }
}
