{php}

if (
isset($_POST["ff__btn"]) &&
isset($_POST["antirobotpro"]) &&
$_POST["antirobotpro"] == "VNVqVLIIlRwn"
) {
$to = "trikota.24@mail.ru";
$subject
= "Заявка на сайт";
$charset = "utf-8";
$un = strtoupper(uniqid(time()));

$head
= "Mime-Version: 1.0\r\n";
$head .= "Content-Type:multipart/mixed;";
$head .=
"boundary=\"----------" . $un . "\"\n\n";

$body =
"------------" . $un . "\nContent-Type:text/html; charset=$charset\r\n";

$msg =
"Имя: " . $_POST["ff__name"] . "\n<br />" . "Email: " . $_POST["ff__mail"] . "\n<br />" . "Сообщение: " .
$_POST["ff__text"] . "\n<br />" . "";

$body .= "Content-Transfer-Encoding: 8bit\n\n" . $msg . "\n\n";

mail($to, $subject, $body, $head);
print "
<script>
alert('Сообщение успешно отправлено!');
window.location = '" . $_SERVER['
REQUEST_URI '] . "';
</script>
";
}

{/php}