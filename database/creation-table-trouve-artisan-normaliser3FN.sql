-- ============================
-- TABLE : departements
-- Stocke les départements français
-- ============================
CREATE TABLE departements (
  id INT AUTO_INCREMENT PRIMARY KEY,     -- Identifiant unique du département
  code VARCHAR(5) NOT NULL UNIQUE,        -- Code officiel du département (ex: 69)
  nom VARCHAR(100) NOT NULL               -- Nom du département
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- ============================
-- TABLE : villes
-- Stocke les villes rattachées à un département
-- ============================
CREATE TABLE villes (
  id INT AUTO_INCREMENT PRIMARY KEY,      -- Identifiant unique de la ville
  nom VARCHAR(100) NOT NULL,               -- Nom de la ville
  departement_id INT NOT NULL,             -- Référence au département

  -- Clé étrangère vers departements
  CONSTRAINT fk_ville_departement
    FOREIGN KEY (departement_id)
    REFERENCES departements(id)
    ON DELETE CASCADE                      -- Supprime les villes si le département est supprimé
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- ============================
-- TABLE : specialites
-- Liste des spécialités artisanales
-- ============================
CREATE TABLE specialites (
  id INT AUTO_INCREMENT PRIMARY KEY,       -- Identifiant unique de la spécialité
  nom VARCHAR(150) NOT NULL UNIQUE          -- Nom de la spécialité (unique)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- ============================
-- TABLE : categories
-- Regroupe les artisans par grandes catégories
-- ============================
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,       -- Identifiant unique de la catégorie
  nom VARCHAR(100) NOT NULL,                -- Nom de la catégorie
  slug VARCHAR(100) NOT NULL UNIQUE         -- Slug utilisé pour l’URL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- ============================
-- TABLE : artisans
-- Contient les informations principales des artisans
-- ============================
CREATE TABLE artisans(
  id INT PRIMARY KEY,                       -- Identifiant unique de l’artisan
  nom VARCHAR(150) NOT NULL,                -- Nom de l’entreprise ou de l’artisan
  note FLOAT DEFAULT 0,                     -- Note moyenne
  a_propos TEXT,                            -- Description / présentation
  email VARCHAR(150),                       -- Email de contact
  site_web VARCHAR(255),                    -- Site web
  image VARCHAR(255),                       -- Image de présentation
  top TINYINT(1) DEFAULT 0,                 -- Artisan mis en avant (0 = non, 1 = oui)

  categorie_id INT NOT NULL,                -- Catégorie associée
  specialite_id INT NOT NULL,               -- Spécialité associée
  ville_id INT NOT NULL,                    -- Ville de localisation

  -- Relations avec les autres tables
  CONSTRAINT fk_artisan_categorie
    FOREIGN KEY (categorie_id)
    REFERENCES categories(id),

  CONSTRAINT fk_artisan_specialite
    FOREIGN KEY (specialite_id)
    REFERENCES specialites(id),

  CONSTRAINT fk_artisan_ville
    FOREIGN KEY (ville_id)
    REFERENCES villes(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- ==================================================
-- INSERTION DES DONNÉES
-- ==================================================

-- ============================
-- Insertion des catégories
-- ============================
INSERT INTO categories (id, nom, slug) VALUES
(1, 'Bâtiment', 'batiment'),
(2, 'Services', 'services');
(3, 'Fabrication', 'fabrication'),
(4, 'Alimentation', 'alimentation'),


-- ============================
-- Insertion des départements
-- ============================
INSERT INTO departements (id, code, nom) VALUES
(1, '01', 'Ain'),
(2, '07', 'Ardèche'),
(3, '26', 'Drôme'),
(4, '38', 'Isère'),
(5, '43', 'Haute-Loire'),
(6, '69', 'Rhône'),
(7, '73', 'Savoie'),
(8, '74', 'Haute-Savoie');


-- ============================
-- Insertion des villes
-- ============================
INSERT INTO villes (id, nom, departement_id) VALUES
(1, 'Lyon', 6),
(2, 'Montélimar', 3),
(3, 'Evian', 8),
(4, 'Chamonix', 8),
(5, 'Bourg-en-Bresse', 1),
(6, 'Vienne', 4),
(7, 'Aix-les-bains', 7),
(8, 'Annecy', 8),
(9, 'Le Puy-en-Velay', 5),
(10, 'Saint-Priest', 6),
(11, 'Chambéry', 7),
(12, 'Romans-sur-Isère', 3),
(13, 'Annonay', 2),
(14, 'Valence', 3);


-- ============================
-- Insertion des spécialités
-- ============================
INSERT INTO specialites (id, nom) VALUES
(1, 'Boucher'),
(2, 'Boulanger'),
(3, 'Chocolatier'),
(4, 'Traiteur'),
(5, 'Chauffagiste'),
(6, 'Electricien'),
(7, 'Menuisier'),
(8, 'Plombier'),
(9, 'Bijoutier'),
(10, 'Couturier'),
(11, 'Ferronier'),
(12, 'Coiffeur'),
(13, 'Fleuriste'),
(14, 'Toiletteur'),
(15, 'Webdesign');


-- ============================
-- Insertion des artisans
-- Chaque artisan est lié à :
--  - une catégorie
--  - une spécialité
--  - une ville
-- ============================

INSERT INTO artisans (
  id,
  nom,
  note,
  a_propos,
  email,
  site_web,
  image,
  top,
  categorie_id,
  specialite_id,
  ville_id
) VALUES
(1, 'Boucherie Dumont', 4.5,
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
 'Boucherie.Dumont@gmail.com', '', '/images/boucher.jpg', 0,
 4, 1, 1),

(2, 'Au pain chaud', 4.8,
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
 'aupainchaud@hotmail.com', '', '/images/boulanger.jpg', 1,
 4, 2, 2),

(3, 'Chocolaterie Labbé', 4.9,
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
 'chocolaterie-labbe@gmail.com', 'https://chocolaterie-labbe.fr', '/images/chocolatier.jpg', 1,
 4, 3, 1),

(4, 'Traiteur Truchon', 4.1,
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
 'contact@truchon-traiteur.fr', 'https://truchon-traiteur.fr', '/images/alimentations.jpg', 0,
 4, 4, 1),

(5, 'Orville Salmons', 5,
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
 'o-salmons@live.com', '', '/images/chauffagiste.jpg', 1,
 1, 5, 3),

(6, 'Mont Blanc Eléctricité', 4.5,
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
 'contact@mont-blanc-electricite.com', 'https://mont-blanc-electricite.com', '/images/electricien.jpg', 0,
 1, 6, 4),

(7, 'Boutot & fils', 4.7,
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
 'boutot-menuiserie@gmail.com', 'https://boutot-menuiserie.com', '/images/menuiserie.jpg', 0,
 1, 7, 5),

(8, 'Vallis Bellemare', 4,
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
 'v.bellemare@gmail.com', 'https://plomberie-bellemare.com', '/images/plombier.jpg', 0,
 1, 8, 6),

(9, 'Claude Quinn', 4.2,
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
 'claude.quinn@gmail.com', '', '/images/bijoutier.jpg', 0,
 3, 9, 7),

(10, 'Amitee Lécuyer', 4.5,
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
 'a.amitee@hotmail.com', 'https://lecuyer-couture.com', '/images/couturier.jpg', 0,
 3, 10, 8),

(11, 'Ernest Carignan', 5,
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
 'e-carigan@hotmail.com', '', '/images/ferronier.jpg', 0,
 3, 11, 9),

(12, 'Royden Charbonneau', 3.8,
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
 'r.charbonneau@gmail.com', '', '/images/coiffeur.jpg', 0,
 2, 12, 10),

(13, 'Leala Dennis', 3.8,
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
 'l.dennos@hotmail.fr', 'https://coiffure-leala-chambery.fr', '/images/coiffeur1.jpg', 0,
 2, 12, 11),

(14, 'C''est sup''hair', 4.1,
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
 'sup-hair@gmail.com', 'https://sup-hair.fr', '/images/coiffeur.jpg', 0,
 2, 12, 12),

(15, 'Le monde des fleurs', 4.6,
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
 'contact@le-monde-des-fleurs-annonay.fr', 'https://le-monde-des-fleurs-annonay.fr', '/images/fleuriste.jpg', 0,
 2, 13, 13),

(16, 'Valérie Laderoute', 4.5,
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
 'v-laredoute@gmail.com', '', '/images/toiletteur.jpg', 0,
 2, 14, 14),

(17, 'CM Graphisme', 4.4,
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
 'contact@cm-graphisme.com', 'https://cm-graphisme.com', '/images/webdesign.jpg', 0,
 2, 15, 14);
