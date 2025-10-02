import { Component, OnInit, Renderer2, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { RouterModule } from "@angular/router"; // Import RouterModule for routerLink

@Component({
  selector: "app-navbar",
  standalone: true,
  // Add RouterModule to imports so routerLink works
  imports: [RouterModule],
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.css",
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  isDarkTheme = false; // New property to track the theme

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    // Check for theme preference on initialization
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      this.isDarkTheme = true;
      this.renderer.addClass(this.document.body, "dark-theme");
    }
  }

  /**
   * Toggles the mobile menu open/closed state.
   */
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  /**
   * Toggles the dark/light theme for the entire application.
   */
  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;

    if (this.isDarkTheme) {
      this.renderer.addClass(this.document.body, "dark-theme");
      localStorage.setItem("theme", "dark");
    } else {
      this.renderer.removeClass(this.document.body, "dark-theme");
      localStorage.setItem("theme", "light");
    }
  }
}
