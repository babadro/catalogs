using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DomainCore;

namespace Catalogs2.Models
{
    public class Cell
    {
        public Cell(int id, int fieldId, FieldType fieldType, string stringVal, bool boolVal, int intVal, DateTime dateVal)
        {
            Id = id;
            FieldId = fieldId;
            switch (fieldType)
            {
                case FieldType.boolean:
                    Val = boolVal;
                    break;
                case FieldType.str:
                    Val = stringVal;
                    break;
                case FieldType.integer:
                    Val = intVal;
                    break;
                case FieldType.date:
                    Val = dateVal;
                    break;
            }
        }
        public int Id { get; }

        public int FieldId { get; }

        public Object Val { get; }
    }
}
