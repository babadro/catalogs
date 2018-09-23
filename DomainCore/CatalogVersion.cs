using System;

namespace DomainCore
{
    public class CatalogVersion
    {
        public CatalogVersion(int id, string name)
        {
            Id = id;
            Name = name;
        }

        public int Id { get; set; }
        public string Name { get; set; }
    }
}
