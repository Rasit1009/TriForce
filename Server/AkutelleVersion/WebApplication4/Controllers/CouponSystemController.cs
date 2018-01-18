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
    public class CouponSystemController: Controller
    {
        private readonly LolocoContext _context;


        public CouponSystemController(LolocoContext context)
        {
            _context = context;
        }

        //Jana Teutenberg: Methode, die eine Id bekommt und weitere Informationen, die aktualisiert werden
        [HttpPost]
        public IActionResult Update([FromBody] Gutscheinart guti)
        {
            var Gutscheina = _context.CouponSystem.SingleOrDefault(
              c => c.Selleri == guti.Selleri);
            if (Gutscheina== null)
            {
                Gutscheina = new CouponSystem()
                {
                    Selleri = guti.Selleri,
                    Coupondetail = guti.Coupondetail,
                    Coupontext = guti.Coupontext,
                    Moneyvalue = guti.Moneyvalue,
                    Number = guti.Number,
                };
                _context.CouponSystem.Add(Gutscheina);
                _context.SaveChanges();

            }

            else
            {

                Gutscheina.Coupontext = guti.Coupontext;
                Gutscheina.Coupondetail = guti.Coupondetail;
                Gutscheina.Moneyvalue = guti.Moneyvalue;
                Gutscheina.Number = guti.Number;
               
            }


            _context.CouponSystem.Update(Gutscheina);
            _context.SaveChanges();

            return Ok();
        }

        //Jana Teutenberg: Methode, die überpürft, ob der für diesen Händler ein System vorhanden ist und gibt das zurück
        [HttpGet("Get/{id}", Name = "GetId")]
        // GET: CouponSystem/Get/5
        public IActionResult GetbyId(string id)
        {

            var Gutscheinart = _context.CouponSystem.SingleOrDefault(
                c => c.Selleri == id);
            if (Gutscheinart == null)
            {



                return Ok(Gutscheinart);

            }
            else
            {


                return Ok(Gutscheinart);
            }
        }


        
        public class Gutscheinart
        {
            
            public string Selleri { get; set; }
  
            public string Coupontext { get; set; }
            public string Coupondetail { get; set; }
            public float Moneyvalue { get; set; }

            public int Number { get; set; }


        }
    }
}
