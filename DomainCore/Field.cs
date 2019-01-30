using System;
using System.Collections.Generic;
using System.Text;

namespace DomainCore
{
    public class Field
    {
        public Field(int id, string fieldName, FieldType fieldType)
        {
            Id = id;
            Name = fieldName;
            FieldType = fieldType;
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public FieldType FieldType { get; set; }
    }
}
