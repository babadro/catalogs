using System;
using System.Collections.Generic;
using System.Text;

namespace DomainCore
{
    public class FieldValue
    {
        public FieldValue(int id, int fieldId, int elId, string stringVal, bool boolVal, int intVal, DateTime dateVal)
        {
            Id = id;
            FieldId = fieldId;
            ElementId = elId;
            StringVal = stringVal;
            BoolVal = boolVal;
            IntVal = intVal;
            DateVal = dateVal;
        }
        public int Id { get; set; }
        public int FieldId { get; set; }
        public int ElementId { get; set; }
        public string StringVal { get; set; }
        public bool BoolVal { get; set; }
        public int IntVal { get; set; }
        public DateTime DateVal { get; set; }
    }
}
