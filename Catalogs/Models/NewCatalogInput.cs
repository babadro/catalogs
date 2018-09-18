using Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;

namespace Catalogs.Models
{
    public class NewCatalogInput
    {
        public string Name { get; set; }
        public List<Field> Fields { get; set; }
    }
}