using System;
using System.Collections.Generic;
using System.Text;

namespace DomainCore
{
    public class Field
    {
        public Field(int id, string name, FieldType ftype)
        {
            Id = id;
            Name = name;
            FieldType = ftype;
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public FieldType FieldType { get; set; }
    }
}
