﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using WebApplication4.Daten;
using WebApplication4.Models;

using WebApplication4.Controllers;
using static WebApplication4.Controllers.CouponSystemController;

namespace WebApplication4.Controllers
{
    [Route("api/[controller]")]
    public class CouponController : Controller
    {
        private readonly LolocoContext _context;
        public DateTime da = DateTime.Now;



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

        //Jana Teutenberg: Methode, die aktuellen Punktestand bei diesem Händler angibt
        [HttpGet("GetAllPoints/{id}", Name = "GetAllPoints")]
        // GET: Coupon/GetAllPoints/5
        public IActionResult GetAllPoints(string id)
        {
            var All = new List<Coupon>();
            int Anzahl = 0;
            All = _context.Coupon.Where(u => u.Selleri == id).ToList();

            foreach (Coupon p in All)
            {
                
                Anzahl = Anzahl + p.Points;
            }

            return Ok(Anzahl);

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

        //Jana Teutenberg: Methode, die für eine Liste von Händlern, die System Infos zurück gibt
        [HttpPost("GetSystem", Name = "GetSystem")]
        // GET: Coupon/GetSystem
        public IActionResult GetSystem([FromBody] Punkte[] Liste )
        {
            

            var Li = new List<CouponSystem>();
            var cou = new CouponSystem();
        
            if(Liste.Length != 0) { 
               
        //    for (int i = 0; i< Liste.Length; i++){

                    //  Li[i] = _context.CouponSystem.SingleOrDefault(
                    //  c => c.Selleri == Liste[i].Selleri);
                    //Li[i] = Liste[i];


        //            }

            foreach(Punkte p in Liste)
                {
                 cou = _context.CouponSystem.SingleOrDefault(
                      c => c.Selleri == p.Selleri);
                    Li.Add(cou);
                }
                if (Li == null)
            {
                return Ok(Li);
            }
            else
            {
                return Ok(Li);
            }
            } else {
                return Ok(Li);
            }
        }
        //Jana Teutenberg: Methode, die Punkte gutschreibt
        [HttpPost("Points", Name = "Points")]
        // Post: Coupon/Points
        public IActionResult Points([FromBody] Punkte pu)
        {



            var Po = _context.Coupon.SingleOrDefault(
                c => c.Selleri == pu.Selleri && c.Useri == pu.Useri);
            var Person = _context.Users.SingleOrDefault(c => c.I == pu.Useri);
            var Trans = new Models.Action()
            {
                Selleri = pu.Selleri,
                Date = this.da,
                Useri = pu.Useri,
                Sales = pu.Points,
                Wochentag = da.DayOfWeek.ToString(),

            };
            _context.Action.Add(Trans);
            
            if (Po == null)
            {

                Po = new Coupon ()
                {

                   Points = pu.Points,
                   Selleri = pu.Selleri,
                   Useri = pu.Useri,


                };
                
                Person.AllPoints = Person.AllPoints + pu.Points;
                _context.Update(Person);
                _context.Coupon.Add(Po);
                _context.SaveChanges();
                return Ok();

            }
            else
            {
                Po.Points = Po.Points + pu.Points;
                Person.AllPoints = Person.AllPoints + pu.Points;
                _context.SaveChanges();

                _context.Update(Po);
                return Ok();
            }





        }

        //Jana Teutenberg: Methode, die Punkte löscht, sobald Gutschein eingelöst wird
        [HttpPost("Delete", Name = "DeletePoints")]
        // Post: Coupon/Delete
        public IActionResult Delete([FromBody] Punkte pu)
        {



            var Po = _context.Coupon.SingleOrDefault(
                c => c.Selleri == pu.Selleri && c.Useri == pu.Useri);
            if (Po == null)
            {

              
                return Ok(null);

            }
            else
            {
                _context.Remove(Po);
                _context.SaveChanges();

                
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
