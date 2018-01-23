﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;
using WebApplication4.Daten;

namespace WebApplication4.Migrations
{
    [DbContext(typeof(LolocoContext))]
    [Migration("20180123143657_f3")]
    partial class f3
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.1-rtm-125")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("WebApplication4.Models.Action", b =>
                {
                    b.Property<string>("Actionid")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Date");

                    b.Property<int>("Sales");

                    b.Property<string>("Selleri");

                    b.Property<string>("Useri");

                    b.Property<string>("Wochentag");

                    b.HasKey("Actionid");

                    b.ToTable("Action");
                });

            modelBuilder.Entity("WebApplication4.Models.Consumer", b =>
                {
                    b.Property<int>("Consumerid")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Beruf");

                    b.Property<string>("Firstname");

                    b.Property<string>("Lastname");

                    b.Property<string>("i");

                    b.Property<int>("number");

                    b.Property<string>("street");

                    b.HasKey("Consumerid");

                    b.ToTable("Consumer");
                });

            modelBuilder.Entity("WebApplication4.Models.Coupon", b =>
                {
                    b.Property<string>("Couponid")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Points");

                    b.Property<string>("Selleri");

                    b.Property<string>("Useri");

                    b.HasKey("Couponid");

                    b.ToTable("Coupon");
                });

            modelBuilder.Entity("WebApplication4.Models.CouponSystem", b =>
                {
                    b.Property<int>("CouponSystemid")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Coupondetail");

                    b.Property<string>("Coupontext");

                    b.Property<float>("Moneyvalue");

                    b.Property<int>("Number");

                    b.Property<string>("Selleri");

                    b.HasKey("CouponSystemid");

                    b.ToTable("CouponSystem");
                });

            modelBuilder.Entity("WebApplication4.Models.Credit", b =>
                {
                    b.Property<string>("Creditid")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Selleri");

                    b.Property<string>("Useri");

                    b.HasKey("Creditid");

                    b.ToTable("Credit");
                });

            modelBuilder.Entity("WebApplication4.Models.User", b =>
                {
                    b.Property<int>("Userid")
                        .ValueGeneratedOnAdd();

                    b.Property<float>("AllCredit");

                    b.Property<int>("AllPoints");

                    b.Property<string>("Business");

                    b.Property<string>("Businessname");

                    b.Property<string>("City");

                    b.Property<int>("Day");

                    b.Property<string>("Email");

                    b.Property<string>("Familystatus");

                    b.Property<string>("Firstname");

                    b.Property<string>("Gender");

                    b.Property<string>("Housenumber");

                    b.Property<string>("I");

                    b.Property<string>("Imagepath");

                    b.Property<bool>("IsSeller");

                    b.Property<string>("Lastname");

                    b.Property<int>("Month");

                    b.Property<int>("PLZ");

                    b.Property<string>("Profession");

                    b.Property<string>("Street");

                    b.Property<string>("Text");

                    b.Property<int>("Year");

                    b.Property<bool>("vorhanden");

                    b.HasKey("Userid");

                    b.ToTable("User");
                });
#pragma warning restore 612, 618
        }
    }
}
