using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using WebApplication4.Daten;
using WebApplication4.Models;

namespace WebApplication4.Controllers
{
    [Route("api/[controller]")]
    public class CreditController: Controller
    {
        private readonly LolocoContext _context;

        public CreditController(LolocoContext context)
        {
            _context = context;
        }

        //Jana Teutenberg: Methode, die den eine Consumerid und eine Händlerid bekommt und einen Gutscheinstring zurück gibt
        [HttpPost]
        public IActionResult Generate([FromBody] Gutschein gutschein)
        {
            var Gutschein = _context.Credit.SingleOrDefault(c => c.Selleri == gutschein.Selleri && c.Useri == gutschein.Useri);

            if (Gutschein == null)
            {
                Gutschein = new Credit()
                {
                    
                    Selleri = gutschein.Selleri,
                    Useri = gutschein.Useri,
                };

                _context.Credit.Add(Gutschein);
                _context.SaveChanges();

                return Ok(Gutschein.Creditid);

            }

            else
            {
                return Ok(Gutschein.Creditid);
            }





        }



        

        public class Gutschein
        {
            public string Creditid { get; set; }
            public string Selleri { get; set; }
            public string Useri { get; set; }


        }

       
    }
}
