using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Catalog
    {
        public Catalog(int id, string catalog_name)
        {
            Id = id;
            Name = catalog_name;
        }

        public int Id { get; set; }
        public string Name { get; set; }
    }
}
