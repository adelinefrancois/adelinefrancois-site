<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: contact.html');
    exit;
}

$destinataire = 'contact@adelinefrancois.com';

$prenom    = htmlspecialchars(trim($_POST['prenom'] ?? ''));
$nom       = htmlspecialchars(trim($_POST['nom'] ?? ''));
$email     = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$telephone = htmlspecialchars(trim($_POST['telephone'] ?? ''));
$projet    = htmlspecialchars(trim($_POST['type-projet'] ?? ''));
$message   = htmlspecialchars(trim($_POST['message'] ?? ''));
$bot       = $_POST['bot-field'] ?? '';

if (!empty($bot) || empty($prenom) || empty($nom) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: contact.html?erreur=1');
    exit;
}

$sujet = "Nouveau message de $prenom $nom — adelinefrancois.com";

$corps = "Nouveau message reçu depuis le formulaire de contact.\n\n";
$corps .= "Prénom : $prenom\n";
$corps .= "Nom : $nom\n";
$corps .= "E-mail : $email\n";
$corps .= "Téléphone : $telephone\n";
$corps .= "Type de projet : $projet\n\n";
$corps .= "Message :\n$message\n";

$entetes  = "From: noreply@adelinefrancois.com\r\n";
$entetes .= "Reply-To: $email\r\n";
$entetes .= "Content-Type: text/plain; charset=UTF-8\r\n";

mail($destinataire, $sujet, $corps, $entetes);

header('Location: contact.html?envoye=1');
exit;
