using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel;

namespace Domain
{
    public enum FieldType : byte
    {
        [Description("Строка")]
        str = 0,
        [Description("Булево")]
        boolean = 1,
        [Description("Целое число")]
        integer = 2,
        [Description("Дата")]
        date = 3
    }
}
