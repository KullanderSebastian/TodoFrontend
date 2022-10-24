import "../App.css";

function Header() {
  function logout() {
    sessionStorage.clear();
    window.location.reload(false);
  }

  return (
        <header>
            <h1>Todo list</h1>
            <p>using Django</p>
            <h5 className={sessionStorage.getItem("access") ? "" : "displayNone"} onClick={logout}>Logout</h5>
        </header>
  );
}

export default Header;
