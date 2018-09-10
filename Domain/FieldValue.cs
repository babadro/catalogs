using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class FieldValue
    {
        public FieldValue(int id, int fieldId, int elId)
        {
            Id = id;
            FieldId = fieldId;
            ElementId = elId;
        }
        public int Id { get; set; }
        public int FieldId { get; set; }
        public int ElementId { get; set; }
        public string StringVal { get; set; }
        public bool BoolVal { get; set; }
        public int IntVal { get; set; }
        public DateTime DateVale { get; set; }
    }
}
