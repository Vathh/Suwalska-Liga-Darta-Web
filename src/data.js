export const jobs = [
  {
    Id: 1,
    UserId : 5,
    CreatedDate : new Date(2022,6,11),
    Priority : 1,
    Description : "Wymiana bębna Padma",
    Place : "Padma 3.0 magazyn",
    Object : "BIZHUB 223",
    AdditionalInfo : "Brudzi, sprawdzic beben i transfer",
    UpdateInfo : ""
  },
  {
    Id: 2,
    UserId : 6,
    CreatedDate : new Date(2022,10,9),
    Priority : 2,
    Description : "Naprawa finiszera Krystyny",
    Place : "Utrata 2c/50",
    Object : "BIZHUB C368",
    AdditionalInfo : "Finiszer wyrzuca blad C-0512",
    UpdateInfo : ""
  },
  {
    Id: 3,
    UserId : 7,
    CreatedDate : new Date(2022,2,11),
    Priority : 3,
    Description : "Lotto Augustów",
    Place : "",
    Object : "",
    AdditionalInfo : "",
    UpdateInfo : ""
  }
]

export const closedJobs = [
  {
    Id: 1,
    UserId : 7,
    CreatedDate : new Date(2022,1,11),
    Priority : 2,
    Description : "Makao",
    Place : "Pacanowo",
    Object : "maszyna do lodoherbaty",
    AdditionalInfo : "Pomieszalem harnolda",
    UpdateInfo : "",
    IsDone : true,
    ClosedDate : new Date(2022,1,15),
    CloseUserId : 6
  },
  {
    Id: 2,
    UserId : 5,
    CreatedDate : new Date(2022,2,11),
    Priority : 3,
    Description : "Ciasto z dziąsłem",
    Place : "Piaskowa 15 suwalki",
    Object : "piekarnik",
    AdditionalInfo : "zrobic ciasto pyszne smakowite",
    UpdateInfo : "",
    IsDone : false,
    ClosedDate : new Date(2022,11,2),
    CloseUserId : 7
  } 
]

export const services = [
    {
      Id: 1,
      UserId : 5,
      CreatedDate : new Date(2022,3,25),
      Priority : 1,
      Description : "Naprawa drukarki KRAM",
      Object : "HP 2055",
      AdditionalInfo : "zacina duplex",
      UpdateInfo : ""
    },
    {
      Id: 2,
      UserId : 6,
      CreatedDate : new Date(2022,1,16),
      Priority : 2,
      Description : "Naprawa laptopa Mietka",
      Object : "dell latitude 7490",
      AdditionalInfo : "zepsuty wiatrak chyba bo trzeszczy",
      UpdateInfo : ""
    },
    {
      Id: 3,
      UserId : 7,
      CreatedDate : new Date(2022,1,18),
      Priority : 3,
      Description : "Zamknac zlecenia lotto",
      Object : "",
      AdditionalInfo : "",
      UpdateInfo : ""
    }
]

export const closedServices = [
  {
    Id: 1,
    UserId : 6,
    CreatedDate : new Date(2022,2,15),
    Priority : 2,
    Description : "Zawiasy w laptopie Mariana",
    Object : "dell 5450 SN123456789",
    AdditionalInfo : "",
    UpdateInfo : "",
    IsDone : false,
    ClosedDate : new Date(2022,3,15),
    CloseUserId : 5
  },
  {
    Id: 2,
    UserId : 7,
    CreatedDate : new Date(2022,1,23),
    Priority : 3,
    Description : "Czyszczenie maszyny do klienta",
    Object : "bizhub c458",
    AdditionalInfo : "potestowac wszystkie szuflady i podajnik reczny",
    UpdateInfo : "",
    IsDone : true,
    ClosedDate : new Date(2022,2,20),
    CloseUserId : 6
  }
]

export const orders = [
  {
    Id: 1,
    UserId : 6,
    CreatedDate : new Date(2022,6,11),
    Priority : 1,
    Description : "Bateria do laptopa bogdana mariana",
    Client : "bogdan marian",
    Object : "hp eq2152nw SN12345561",
    AdditionalInfo : "poszukac baterii, jak tansza niz 200 to zamowic",
    UpdateInfo : ""
  },
  {
    Id: 2,
    UserId : 5,
    CreatedDate : new Date(2022,6,7),
    Priority : 2,
    Description : "toner do HP2055",
    Client : "kram",
    Object : "hp2055",
    AdditionalInfo : "potrzebujemy 15 sztuk",
    UpdateInfo : ""
  },
  {
    Id: 3,
    UserId : 7,
    CreatedDate : new Date(2022,6,22),
    Priority : 3,
    Description : "Toner TN312K",
    Client : "andrzejek",
    Object : "bizhub c258",
    AdditionalInfo : "do pttk suwalki kosciuszki",
    UpdateInfo : ""
  }
]

export const closedOrders = [
  {
    Id: 1,
    UserId : 7,
    CreatedDate : new Date(2022,6,22),
    Priority : 2,
    Description : "Ciasto z masłem",
    Client : "tajny klient x",
    Object : "komputer lenovo SN581823817 model jakotaki",
    AdditionalInfo : "pyszne maslo",
    UpdateInfo : "",
    IsDone : true,
    ClosedDate : new Date(2022,6,27),
    CloseUserId : 8
  },
  {
    Id: 2,
    UserId : 7,
    CreatedDate : new Date(2022,6,23),
    Priority : 3,
    Description : "kartofle",
    Client : "anna maria wesolowska",
    Object : "babka ziemniaczana",
    AdditionalInfo : "2kg kartofli na juz",
    UpdateInfo : "",
    IsDone : false,
    ClosedDate : new Date(2022,6,24),
    CloseUserId : 8
  }
]

export const users = [
  {
    Id: 5,
    Name : "Arek",
    Login : "Arek123",
    PasswordHash : "Arek123",
    RoleId : 1
  },
  {
    Id: 6,
    Name : "Przemek",
    Login : "Przemek123",
    PasswordHash : "Przemek123",
    RoleId : 1
  },
  {
    Id: 7,
    Name : "Maciej",
    Login : "Maciej123",
    PasswordHash : "Maciej123",
    RoleId : 2
  },
  {
    Id: 8,
    Name : "Kamila",
    Login : "Kamila123",
    PasswordHash : "Kamila123",
    RoleId : 1
  }
]

export const roles = [
  {
    Id: 1,
    Name : "Manager"
  }, 
  {
    Id: 2,
    Name : "Admin"
  }
]