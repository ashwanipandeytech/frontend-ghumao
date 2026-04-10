<?php

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

// echo $request->data->fullName;
// echo $request->data->phone;
// echo $request->data->email;
// echo $request->data->destination;
// echo $request->data->noOfTravellers;
// echo $request->data->travellingMonth;
  // print_r($request->data->data->fullName);
  // echo $request->data->fullName ;die;
    if($request->data){

 ?>

    <?php
      $to = 'anuradha@ghumao.in';
      $subject = 'Ghumao Inquiry';

      $headers = "From: noreply@ghumao.in\r\n";

      $headers .= 'CC: anu_07dalmia@hotmail.com'."\r\n";
      $headers .= "MIME-Version: 1.0\r\n";
      $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

      $message = '<html><body>';
      $message .= '<table rules="all" style="border-color: #666;" cellpadding="10">';
      $message .= "<tr><td><strong>Full Name</strong> </td><td>" . $request->data->fullName . "</td></tr>";
      $message .= "<tr><td><strong>Phone Number</strong> </td><td>" . $request->data->phone . "</td></tr>";
      $message .= "<tr><td><strong>Email</strong> </td><td>" . $request->data->email . "</td></tr>";
      $message .= "<tr><td><strong>Destination Travelling</strong> </td><td>" . $request->data->destination . "</td></tr>";
      $message .= "<tr><td><strong>No of Travellers</strong> </td><td>" . $request->data->noOfTravellers . "</td></tr>";
      $message .= "<tr><td><strong>Travelling month</strong> </td><td>" . $request->data->travellingMonth . "</td></tr>";
      $message .= "</table>";
      $message .= "</body></html>";

    print_r(mail($to,$subject,$message,$headers));




    } ?>
