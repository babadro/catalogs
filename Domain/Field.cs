using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
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
