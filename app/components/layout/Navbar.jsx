"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

export default function CustomNavbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Add background when scrolling
      setScrolled(currentScrollY > 50);

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className={`custom-navbar ${
        scrolled ? "navbar-scrolled" : ""
      } ${showNavbar ? "navbar-show" : "navbar-hide"}`}
    >
      <Container>
        <Navbar.Brand href="/">
          <div className="d-flex align-items-center gap-1">
            <div>
              <img
                src="/logo.png"
                alt="School Logo"
                className="w-14 h-14 object-contain"
              />{" "}
            </div>

            <div>
              <p className="mb-0 text-lg fw-bold md:flex hidden text-yellow-200!">
                Bharatha Vidyalaya Matriculation Higher Secondary School
              </p>
            </div>
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" className="bg-white" />

        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center gap-lg-3">
            <Nav.Link href="/" className="nav-link-custom">
              Home
            </Nav.Link>

            <Nav.Link href="/about" className="nav-link-custom">
              About
            </Nav.Link>

            <Nav.Link href="/gallery" className="nav-link-custom">
              Gallery
            </Nav.Link>

            <Nav.Link href="/admissions" className="nav-link-custom">
              Admissions
            </Nav.Link>
            <Nav.Link href="/toppers" className="nav-link-custom">
              Toppers
            </Nav.Link>

            <Nav.Link href="/contact" className="nav-link-custom">
              Contact
            </Nav.Link>

            <Button
              href="/admissions"
              className="
    ms-lg-3
    bg-gradient-to-r
    from-yellow-400
    via-yellow-500
    to-yellow-400
    border-0
    text-black
    fw-bold
    px-4 py-2
    rounded-pill
    shadow-lg
  "
            >
              🎓 Apply Now
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
