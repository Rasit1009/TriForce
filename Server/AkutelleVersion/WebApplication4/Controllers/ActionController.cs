using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using WebApplication4.Daten;
using WebApplication4.Models;
using WebApplication4.Controllers;

namespace WebApplication4.Controllers
{
    [Route("api/[controller]")]
    public class ActionController: Controller
    {
        private readonly LolocoContext _context;

        public ActionController(LolocoContext context)
        {
            _context = context;
        }

        //Jana Teutenberg: Methode, die den eine Creditid bekommt und diesen Gutschein und seine Punkte löscht
        [HttpGet("getDay/{id}", Name = "getDay")]
        // Api/action/getDay/{id}
        public IActionResult getDay(string id)
        {
            int Montag = 1;
            int UmsatzM = 0;
            int Dienstag = 1;
            int UmsatzD= 0;
            int Mittwoch = 1;
            int UmsatzMi = 0;
            int Donnerstag= 1;
            int UmsatzDo = 0;
            int Freitag = 1;
            int UmsatzF = 0;
            int Samstag = 1;
            int UmsatzS = 0;
            Day Tag;


            var Trans = new List<Models.Action>();
            Trans = _context.Action.Where(u => u.Selleri == id).ToList();
            
            foreach (Models.Action a in Trans)
            {
                if(a.Wochentag == "Monday")
                {
                    Montag = Montag + 1;
                    UmsatzM = UmsatzM + a.Sales;

                }
                else if (a.Wochentag == "Tuesday")
                {
                    Dienstag = Dienstag + 1;
                    UmsatzD = UmsatzD + a.Sales;

                }
                else if (a.Wochentag == "Wednesday")
                {
                    Mittwoch = Mittwoch + 1;
                    UmsatzMi = UmsatzMi + a.Sales;

                }
                else if (a.Wochentag == "Thursday")
                {
                    Donnerstag = Donnerstag + 1;
                    UmsatzDo = UmsatzDo + a.Sales;

                }
                else if (a.Wochentag == "Friday")
                {
                    Freitag = Freitag + 1;
                    UmsatzF = UmsatzF + a.Sales;

                }
                else if (a.Wochentag == "Saturday")
                {
                    Samstag = Samstag + 1;
                    UmsatzS = UmsatzS + a.Sales;

                }

            }

            Tag = new Day()
            {   
                Monday = UmsatzM / Montag,
                Tuesday = UmsatzD /Dienstag,
                Wednesday = UmsatzMi /Mittwoch,
                Thursday = UmsatzDo/Donnerstag,
                Friday = UmsatzF/Freitag,
                Saturday = UmsatzS/Samstag,
            

            };

            return Ok(Tag);
        }

        public class Day
        {
            public int Monday { get; set; }
            public int Tuesday { get; set; }
            public int Wednesday { get; set; }
            public int Thursday { get; set; }
            public int Friday { get; set; }
            public int Saturday { get; set; }
        }
    }
}
