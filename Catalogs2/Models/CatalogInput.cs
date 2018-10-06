using DomainCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Catalogs2.Models
{
    public class CatalogInput
    {
        [Required]
        public string Name { get; set; }
        public List<Field> Fields { get; set; }
    }
}
