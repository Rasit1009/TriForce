using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using WebApplication4.Daten;
using WebApplication4.Models;
using System.Globalization;


namespace WebApplication4
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {

        private readonly LolocoContext _context;
        public bool isseller;
        public DateTime da = DateTime.Now;




        public UsersController(LolocoContext context)
        {
            _context = context;


        }

        //Jana Teutenberg: Methode, die alle Users zurück gibt
        [HttpGet]
        public IActionResult Get()
        {

            return Ok(_context.Users.ToList());
        }

        //Jana Teutenberg: Methode, die überpürft, ob der User vorhanden ist und ihn sonst anlegt mit einer Id
        [HttpGet("Get/{id}", Name = "GetbyId")]
        // GET: Users/Get/5
        public IActionResult GetbyId(string id)
        {
            // bool vorhanden;


            var Person = _context.Users.SingleOrDefault(
                c => c.I == id);
            if (Person == null)
            {
                // Create a new user                 
                Person = new User()
                {

                    I = id,
                    vorhanden = true,

                };

                _context.Users.Add(Person);
                _context.SaveChanges();
                //vorhanden = false;
                return Ok(Person);

            }
            else
            {
                //vorhanden = true;
                Person.vorhanden = false;
                _context.SaveChanges();

                _context.Update(Person);

                _context.Users.Update(Person);

                return Ok(Person);
            }



            // return Ok(vorhanden);

        }
        //Jana Teutenberg: Methode, die eine Id bekommt und den Vornamen zurück gibt
        [HttpGet("Getfirstname/{id}", Name = "GetFirstname")]
        // GET: Users/GetFirstname
        public IActionResult GetFirstname(string id)
        {



            var Person = _context.Users.SingleOrDefault(
                c => c.I == id);
            if (Person == null)
            {
                return Ok(false);
            }
            else
            {
                string vorname = Person.Firstname;
                return Ok(vorname);

            }





        }
        //Jana Teutenberg: Methode, die eine Id bekommt und weitere Informationen, die aktualisiert werden
        [HttpPost]
        public IActionResult Update([FromBody] Person person)
        {
            var Person = _context.Users.SingleOrDefault(
              c => c.I == person.I);
            if (Person == null)
            {
                return BadRequest();
            }

            else
            {

                if (person.IsSeller == true)
                {
                    Person.IsSeller = person.IsSeller;
                    Person.Firstname = person.Firstname;
                    Person.Lastname = person.Lastname;
                    Person.Email = person.Email;
                    Person.Street = person.Street;
                    Person.PLZ = person.PLZ;
                    Person.City = person.City;
                    Person.Housenumber = person.Housenumber;
                    Person.Businessname = person.Businessname;
                    Person.Business = person.Business;
                    Person.Text = person.Text;
                    Person.Imagepath = person.Imagepath;

                }
                else
                {
                    Person.IsSeller = person.IsSeller;
                    Person.Firstname = person.Firstname;
                    Person.Lastname = person.Lastname;
                    Person.Email = person.Email;
                    Person.Street = person.Street;
                    Person.PLZ = person.PLZ;
                    Person.City = person.City;
                    Person.Day = person.Day;
                    Person.Month = person.Month;
                    Person.Year = person.Year;
                    Person.Housenumber = person.Housenumber;
                    Person.Profession = person.Profession;
                    Person.Familystatus = person.Familystatus;
                    Person.Gender = person.Gender;
                }
            }


            _context.Users.Update(Person);
            _context.SaveChanges();

            return Ok();
        }
        public class Person
        {
            public string I { get; set; }
            public bool IsSeller { get; set; }
            public string Firstname { get; set; }
            public string Lastname { get; set; }
            public string Street { get; set; }
            public int Day { get; set; }
            public int Month { get; set; }
            public int Year { get; set; }
            public string Profession { get; set; }
            public string Familystatus { get; set; }
            public string Business { get; set; }
            public string Gender { get; set; }
            public string Text { get; set; }
            public string Email { get; set; }
            public bool vorhanden { get; set; }
            public string Imagepath { get; set; }
            public int AllPoints { get; set; }
            public int PLZ { get; set; }
            public string Housenumber { get; set; }
            public string City { get; set; }

            public string Businessname { get; set; }

        }



        //Jana Teutenberg: Methode, die überpürft, ob der User vorhanden ist und ihn dann löscht
        [HttpGet("Delete/{id}", Name = "Delete")]
        // GET: Users/Delete/5
        public IActionResult Delete(string id)
        {



            var Person = _context.Users.SingleOrDefault(
                c => c.I == id);
            if (Person == null)
            {
                return BadRequest();
            }
            else
            {
                _context.Remove(Person);
                _context.SaveChanges();
            }



            return Ok(true);

        }

        //Jana Teutenberg: Methode, die überpürft, ob Daten des Users vollständig
        [HttpGet("Complete/{id}", Name = "Complete")]
        // GET: Users/Complete/5
        public IActionResult Complete(string id)
        {



            var Person = _context.Users.SingleOrDefault(
                c => c.I == id);
            if (Person == null)
            {
                return BadRequest();
            }
            if (Person.Firstname == null || Person.Lastname == null || Person.Street == null)
            {
                return Ok(false);
            }
            else
            { return Ok(true);
            }





        }


        //Jana Teutenberg: Methode, die überpürft, ob der User vorhanden ist und ihn dann löscht
        [HttpGet("Age/{id}", Name = "Age")]
        // GET: Users/Age/5
        public IActionResult Averageage(string id)
        {
            int Tag = da.Day;
            int Monat = da.Month;
            int Jahr = da.Year;
            int Anzahl = 0;
            int A1 = 0;
            int A2 = 0;
            int A3 = 0;
            int A4= 0;
            int A5= 0;
            Age Alterd;

            var us = new User();
            // var Person = _context.Users.SingleOrDefault(
            //  c => c.I == id);

            var Li = new List<Coupon>();
            var Usli = new List<User>();

            Li = _context.Coupon.Where(u => u.Selleri == id).ToList();
            foreach (Coupon p in Li)
            {
                us = _context.Users.SingleOrDefault(
                      c => c.I == p.Useri);
                Usli.Add(us);
                Anzahl = Anzahl + 1;
            }
            foreach ( User u in Usli)
            {
                if (this.Getage(u.Day, u.Month, u.Year, Tag, Monat, Jahr) <= 18)
                {
                    A1 = A1 + 1;
                }
                else if(this.Getage(u.Day, u.Month, u.Year, Tag, Monat, Jahr) <= 25  )
                {
                    A2 = A2 + 1;
                }
                else if (this.Getage(u.Day, u.Month, u.Year, Tag, Monat, Jahr) <= 35)
                {
                    A3 = A3 + 1;
                }
                else if(this.Getage(u.Day, u.Month, u.Year, Tag, Monat, Jahr) <= 50)
                {
                    A4 = A4 + 1;
                }
                else if(this.Getage(u.Day, u.Month, u.Year, Tag, Monat, Jahr) <= 200)
                {
                    A5 = A5 + 1;
                }
            }

            if (Anzahl == 0)
            {
                return Ok(null);
            }
            else
            {
                double Prozent = (100 / Anzahl) * 0.01;

                Alterd = new Age()
                {

                    Age1 = Prozent * A1,
                    Age2 = Prozent * A2,
                    Age3 = Prozent * A3,
                    Age4 = Prozent * A4,
                    Age5 = Prozent * A5,



                };


                return Ok(Alterd);
            }

        }
        

        public class Age
        {
            public double Age1 { get; set; }
            public double Age2 { get; set; }
            public double Age3 { get; set; }
            public double Age4 { get; set; }
            public double Age5 { get; set; }
        }

        public int Getage( int d, int m, int y, int tag, int monat, int jahr)
        {
            int Alter = jahr - y;
            if (m == monat)
            {
                if(tag < d)
                {
                    Alter = Alter - 1;
                }
            }
            if(m<monat)
            {
                Alter = Alter - 1;
            }
            return Alter;
        }

       
    }
}
