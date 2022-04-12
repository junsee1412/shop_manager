import 'dart:convert';
import 'dart:io';

import 'package:http/http.dart' as http;

class Anime {
  final String id;
  final String username;
  final String email;
  final String profilePic;

  const Anime({
    required this.id,
    required this.username,
    required this.email,
    required this.profilePic,
  });

  factory Anime.fromJson(Map<String, dynamic> json) {
    return Anime(
      id: json['_id'],
      username: json['username'],
      email: json['email'],
      profilePic: json['profilePic'],
    );
  }
}

Future<Anime> fetchAnime() async {
  final response = await http.get(
      Uri.parse('http://192.168.1.9:3000/api/user/6253d3615226902f9dfd2d23'),
      headers: {
        HttpHeaders.authorizationHeader:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjUzZDM2MTUyMjY5MDJmOWRmZDJkMjMiLCJpYXQiOjE2NDk2NjA3Njl9.wmfUHNLZ3I_nxeCz2Q6sOWzb-0cRcMOgxD5HN6RakC4',
        'Connection': 'Keep-Alive',
      });

  if (response.statusCode == 200) {
    // If the server did return a 200 OK response,
    // then parse the JSON.
    return Anime.fromJson(jsonDecode(response.body));
  } else {
    // If the server did not return a 200 OK response,
    // then throw an exception.
    throw Exception('Failed to load album');
  }
}
