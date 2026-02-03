<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17498123914"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'AW-17498123914');
  </script>

  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MLS Search - Stacey Curran Homes</title>
  <link rel="stylesheet" href="style.css">
  <script src="https://kit.fontawesome.com/0aacbb7f3b.js" crossorigin="anonymous"></script>

  <style>
    /* Desktop header */
    #header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 20px;
      background: #fff;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      position: relative;
      z-index: 10;
      background-color: rgb(107, 77, 189);
    }

    #logo {
      font-size: 1.5rem;
      font-weight: bold;
      color: #333;
    }

    #links {
      display: flex;
      gap: 15px;
    }

    #links a {
      text-decoration: none;
      color: #333;
      padding: 8px 12px;
      border-radius: 4px;
    }

    #links a:hover {
      background: #f2f2f2;
    }

    #menu-toggle {
      display: none;
    }

    /* Mobile */
    @media (max-width: 768px) {
      #menu-toggle {
        display: block;
        background: none;
        border: none;
        font-size: 1.8rem;
        cursor: pointer;
      }

      #links {
        display: none;
        flex-direction: column;
        position: absolute;
        top: 60px;
        right: 10px;
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 10px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        width: 200px;
      }

      #links.show {
        display: flex;
      }

      #links a {
        padding: 10px 12px;
      }
    }

    /* Main iframe */
    main {
      flex: 1;
      padding: 20px;
    }

    iframe {
      width: 100%;
      height: 85vh;
      border: none;
    }
  </style>
</head>
<body>
  <!-- HEADER -->
  <header id="header">
    <h1 id="logo">Stacey Curran Homes</h1>
    <button id="menu-toggle" aria-label="Toggle navigation">
      <i class="fa-solid fa-bars"></i>
    </button>
    <nav id="links">
      <a href="consultation.php">Free consultation! <i class="fa-solid fa-angle-down"></i></a>
      <a href="home.html">home <i class="fa-solid fa-angle-down"></i></a>
      <a href="mls_search_shell.php">search homes <i class="fa-solid fa-angle-down"></i></a>
      <a href="aboutme.html">about me <i class="fa-solid fa-angle-down"></i></a>
      <a href="contact.html">contact us <i class="fa-solid fa-angle-down"></i></a>
      <a href="user2.php" class="btn">chat with a realtor</a>
    </nav>
  </header>

  <!-- MAIN -->
  <main>
    <iframe src="mls_listings.php" title="MLS Listings"></iframe>
  </main>

  <script>
    // Mobile hamburger toggle
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("links");

    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  </script>
</body>
</html>
