using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickSlackStatusUpdate.Models
{
    public class AddButtonModel
    {
        public string SlackUrl { get; set; }
        public bool IsLinked { get; set; }
        public IEnumerable<LinkedWorkspace> Links { get; set; }
    }
}
