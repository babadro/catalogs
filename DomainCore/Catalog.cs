using System;

namespace DomainCore
{
    public class Catalog
    {
        public Catalog() { }
        public Catalog(int id, string catalog_name)
        {
            Id = id;
            Name = catalog_name;
        }

        public int Id { get; set; }
        public string Name { get; set; }
    }
}
