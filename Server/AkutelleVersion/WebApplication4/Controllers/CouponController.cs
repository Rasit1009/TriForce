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
    public class CouponController : Controller
    {
        private readonly LolocoContext _context;
        

        public CouponController(LolocoContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {

            return Ok(_context.Coupon.ToList());
        }

      

        //Jana Teutenberg: Methode, die aktuellen Punktestand zurück gibt
        [HttpGet("GetPoints/{uid}/{sid}", Name = "GetPoints")]
        // GET: Coupon/GetPoints/5/5
        public IActionResult GetPoints(string uid, string sid)
        {



            var Po = _context.Coupon.SingleOrDefault(
                c => c.Useri == uid && c.Selleri == sid);
            if (Po == null)
            {

                return Ok(null);

            }
            else
            {
                int poi = Po.Points;
                return Ok(poi);
            }





        }


        //Jana Teutenberg: Methode, die alle Händler des Users zurückgibt
        [HttpGet("GetSeller/{uid}", Name = "GetSeller")]
        // GET: Coupon/GetSeller/5
        public IActionResult GetSeller(string uid)
        {


            var Pos = new List<Coupon> ();
            Pos = _context.Coupon.Where(u => u.Useri == uid).ToList();
           


            Console.WriteLine(Pos);
                

            if (Pos == null)
            {

                return Ok(null);

            }
            else
            {
                

                

                return Ok(Pos);
            }





        }
        //Jana Teutenberg: Methode, die Punkte gutschreibt
        [HttpPost("Points", Name = "Points")]
        // Post: Coupon/Points
        public IActionResult Points([FromBody] Punkte pu)
        {



            var Po = _context.Coupon.SingleOrDefault(
                c => c.Selleri == pu.Selleri && c.Useri == pu.Useri);
            if (Po == null)
            {

                Po = new Coupon ()
                {

                   Points = pu.Points,
                   Selleri = pu.Selleri,
                   Useri = pu.Useri,


                };
               
                _context.Coupon.Add(Po);
                _context.SaveChanges();
                return Ok();

            }
            else
            {
                Po.Points = Po.Points + pu.Points;
                _context.SaveChanges();

                _context.Update(Po);
                return Ok();
            }





        }

        public class Punkte
        {
            public int Points { get; set; }
            public string Selleri { get; set; }
            public string Useri { get; set; }

        }
        
    }
}
