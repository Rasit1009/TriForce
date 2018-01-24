using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace WebApplication4.Migrations
{
    public partial class f6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
           
            

            migrationBuilder.AddColumn<bool>(
                name: "isScanned",
                table: "User",
                nullable: false,
                defaultValue: false);

           
             
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
           
            migrationBuilder.DropColumn(
                name: "isScanned",
                table: "User");

            
           
        }
    }
}
