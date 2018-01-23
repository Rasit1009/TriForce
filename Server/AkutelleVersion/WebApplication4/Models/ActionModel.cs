using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication4.Models
{
    public class Action
    {
        public string Actionid { get; set; }
        public string Selleri { get; set; }
        public string Useri { get; set; }

        public int Sales{ get; set; }
        public string Wochentag { get; set; }

        public DateTime Date { get; set; }
    }
}
