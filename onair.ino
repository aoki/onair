#include <WiFi.h>
#include <WebServer.h>
#include "SPIFFS.h"

const char *ssid = "ssid";
const char *password = "password";
const int led = 25;
int count = 0;

WebServer server(80);

void handleStatus(void)
{
  count += 1;

  Serial.println("status: " + String(digitalRead(led)) + " count: " + String(count));

  String json;
  json = "{";
  json += "\"status\":" + String(digitalRead(led));
  json += ",";
  json += "\"count\":" + String(count);
  json += "}";

  server.send(200, "application/json", json);
}

void handleToggle(void)
{
  if (digitalRead(led) == 1)
  {
    digitalWrite(led, LOW);
    handleStatus();
  }
  else
  {
    digitalWrite(led, HIGH);
    handleStatus();
  }
}

void handleStandby(void)
{
  digitalWrite(led, LOW);
  handleStatus();
}

void handleOnair(void)
{
  digitalWrite(led, HIGH);
  handleStatus();
}

void handleUi()
{
  File file = SPIFFS.open("/index.html", "r");
  server.streamFile(file, "text/html");
  file.close();
}

void setup()
{

  Serial.begin(115200);
  pinMode(led, OUTPUT);

  SPIFFS.begin();

  delay(10);
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected.");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  server.on("/ui", handleUi);
  server.on("/", handleStatus);
  server.on("/toggle", handleToggle);
  server.on("/h", handleOnair);
  server.on("/l", handleStandby);
  server.onNotFound(handleStatus);
  server.begin();
}

void loop()
{
  server.handleClient();
  Serial.println("status: " + String(digitalRead(led)));
  delay(1000);
}
