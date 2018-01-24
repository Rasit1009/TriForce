using System;
using System.Collections.Generic;

using System.Threading.Tasks;

namespace WebApplication4.Models
{
    public class User
    {
        public int Userid { get; set; }
        public string Lastname { get; set; }
        public string Firstname { get; set; }
        public int Day { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }

        public string Profession { get; set; }
        public string Familystatus { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string Business { get; set; }
        public string Text { get; set; }

        public int PLZ { get; set; }
        public string Housenumber { get; set; }
        public string Imagepath { get; set; }
        public string Businessname { get; set; }
        public string I { get; set; }
        public bool IsSeller{ get; set; } 

        public int AllPoints { get; set; }

        public bool vorhanden { get; set; }

    }
}
