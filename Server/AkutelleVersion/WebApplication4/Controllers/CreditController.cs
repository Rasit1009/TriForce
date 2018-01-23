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

        //Jana Teutenberg: Methode, die den eine Creditid bekommt und diesen Gutschein und seine Punkte löscht
        [HttpGet("Cash/{creditid}", Name = "Cash")]
        // Api/credit/cash/id
        public IActionResult Cash(string creditid)
        {
            var Gutschein = _context.Credit.SingleOrDefault(c => c.Creditid == creditid);

            if (Gutschein == null)
            {
                return Ok(false);

            }

            else
            {
                string useri;
                string selleri;
                useri = Gutschein.Useri;
                selleri = Gutschein.Selleri;

                var Guti = _context.Coupon.SingleOrDefault(h => h.Selleri == selleri && h.Useri == useri);
                
                var Person = _context.Users.SingleOrDefault(
                c => c.I == useri);
                //Person.AllPoints = Person.AllPoints + Guti.Points;
                Guti.Points = 0;
                _context.Remove(Gutschein);
                _context.Update(Guti);
                _context.SaveChanges();
                
                return Ok(true);
            }





        }

        //Jana Teutenberg: Methode, die einen Gutschein validiert
        [HttpGet("ValidCoupon/{id}", Name = "ValidCoupon")]
        // Api/credit/validcoupon/id
        public IActionResult Valid(string id)
        {
            var Gutschein = _context.Credit.SingleOrDefault(c => c.Creditid == id);

            if (Gutschein == null)
            {
                return Ok(false);

            }

            else
            {
             

                return Ok(true);
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
