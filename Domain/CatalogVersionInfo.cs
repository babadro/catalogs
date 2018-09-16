using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class CatalogVersionInfo
    {
        public int CatalogId { get; set; }
        public int VersionId { get; set; }
        public string CatalogName { get; set; }
        public string VersionName { get; set; }
    }
}
