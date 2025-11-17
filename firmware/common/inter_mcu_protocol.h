#ifndef INTER_MCU_PROTOCOL_H
#define INTER_MCU_PROTOCOL_H

#include <stdio.h>
#include <stdint.h>
#include <string.h>
#include <stdlib.h>
#include <stdbool.h>

typedef struct SPIpacket_t {
    uint8_t startByte;      // Start byte to indicate the beginning of a packet
    uint8_t msgID;          // Command or message type
    uint8_t length;         // Length of the payload
    uint8_t payload[255];   // Payload data (up to 255 bytes)
    uint8_t crc[2];         // CRC for error checking
} SPIpacket_t;

#endif // INTER_MCU_PROTOCOL_H