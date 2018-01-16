using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace WebApplication4.Migrations
{
    public partial class j21 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            

            migrationBuilder.RenameColumn(
                name: "FamilyStatus",
                table: "User",
                newName: "Familystatus");

            

           
           
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
           
              
        }
    }
}
