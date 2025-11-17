# Bill of Materials (BOM)
## xNAV650 to Ouster OS1 Adapter

**Project:** Time Synchronization Adapter for Ouster OS1 LiDAR with xNAV650 INS  
**Revision:** 1.0  
**Date:** 2025-11-14  
**Designer:** Vladyslav Hirchuk

---

## Purpose
This adapter enables time synchronization between the xNAV650 INS and Ouster OS1-128 LiDAR by:
- Converting RS232 NMEA messages (from xNAV650) to TTL 5V (for OS1)
- Level-shifting the PPS signal from 3.3V to 5V TTL
- Providing buffered ethernet pass-through
- Stepping down 12V input to 3.3V for logic circuits

---

## Component List

### Power Components

| Ref | Qty | Value/Part Number | Description | Package/Footprint | Notes |
|-----|-----|-------------------|-------------|-------------------|-------|
| J1 | 1 | Barrel Jack | DC Power Input, 12V | BarrelJack_Horizontal | 5.5mm x 2.1mm recommended |
| U3 | 1 | OKI-78SR-3.3/1.5-W36-C | DC-DC Buck Converter, 12V→3.3V, 1.5A | OKI-78SR Vertical | Non-isolated switching regulator |
| C1 | 1 | 100µF | Electrolytic Capacitor, 25V | Radial D6.3mm, P2.50mm | Input bulk capacitor |
| C2 | 1 | 100µF | Electrolytic Capacitor, 16V | Radial D6.3mm, P2.50mm | Output filter capacitor |
| C5 | 1 | 100µF | Electrolytic Capacitor, 16V | Radial D6.3mm, P2.50mm | Additional 3.3V filtering |
| D1 | 1 | LED (Green) | Power Indicator LED, 5mm | LED_D5.0mm | Forward voltage ~2V, add series resistor if needed |

### Signal Conversion Components

| Ref | Qty | Value/Part Number | Description | Package/Footprint | Notes |
|-----|-----|-------------------|-------------|-------------------|-------|
| U2 | 1 | MAX3232 | Dual RS232 Transceiver | DIP-16, 7.62mm pitch | Converts RS232 ↔ TTL logic levels |
| C3 | 1 | 100µF | Electrolytic Capacitor, 16V | Radial D6.3mm, P2.50mm | Charge pump capacitor for MAX3232 |
| C4 | 1 | 100µF | Electrolytic Capacitor, 16V | Radial D6.3mm, P2.50mm | Charge pump capacitor for MAX3232 |
| U4 | 1 | 74HC125N | Quad 3-State Buffer | DIP-14, 7.62mm pitch | Buffers PPS signal to 5V TTL |
| R1 | 1 | 100Ω | Current Limiting Resistor | Axial, 1/4W, L6.3mm | For LED current limiting |
| R2 | 1 | 100Ω | Current Limiting Resistor | Axial, 1/4W, L6.3mm | Signal termination/protection |

### Connectors

| Ref | Qty | Value/Part Number | Description | Package/Footprint | Notes |
|-----|-----|-------------------|-------------|-------------------|-------|
| J2 | 1 | 15-pin Micro-D Female | Main xNAV650 Interface | DSUB-15 Horizontal, P2.77x2.84mm | Mates with xNAV650 user cable |
| J4 | 1 | RJ45 LED Shielded | Ethernet + Ouster Interface | Amphenol 54602-x08 Horizontal | Combined Ethernet + power + signals |
| U1 | 1 | Ouster OS1 | LiDAR Unit (not on PCB) | — | External device, for reference only |

---

## Additional Materials Required (Not on PCB)

| Item | Qty | Description | Purpose |
|------|-----|-------------|---------|
| PCB | 1 | Custom PCB, 2-layer minimum | Houses all components |
| Enclosure | 1 | Plastic/aluminum project box | Weather protection, mounting |
| Cable - xNAV650 | 1 | User cable or custom 15-pin Micro-D | Connect to xNAV650 main port |
| Cable - Ethernet | 1 | Standard Cat5e/Cat6 patch cable | Ethernet pass-through |
| Cable - OS1 Power/IO | 1 | Custom cable per Ouster spec | Connect to OS1 I/O connector |
| Standoffs/Screws | 4 | M3 or #4-40, 10mm | PCB mounting in enclosure |
| Wire | — | 22-24 AWG stranded | Internal connections |
| Heat shrink tubing | — | Various sizes | Wire insulation and strain relief |

---

## Component Specifications & Notes

### Power Supply Requirements
- **Input:** 12V DC ±10% (10.8V - 13.2V acceptable)
- **Current Draw:** ~200-300mA typical (mostly from U3 regulator)
- **Output:** 3.3V @ 1.5A max (OKI-78SR capability)

### Critical Design Notes

1. **MAX3232 (U2)**
   - Operating voltage: 3.0V - 5.5V (running at 3.3V)
   - Converts xNAV650 RS232 NMEA output to TTL 5V for OS1
   - Requires external capacitors (C3, C4) for charge pump operation
   - ESD sensitive - handle with care

2. **74HC125N (U4)**
   - Quad buffer with 3-state outputs
   - Used to level-shift PPS signal from 3.3V to 5V TTL
   - Enables/disables controlled via OE pins
   - Can buffer multiple signals if needed

3. **OKI-78SR-3.3 (U3)**
   - Efficient switching regulator (typically 85-90% efficiency)
   - Built-in overload and thermal protection
   - No external components required except input/output capacitors
   - Compatible with wide input range (6.5V - 36V)

4. **Capacitors**
   - All 100µF electrolytic capacitors
   - Minimum voltage rating: 16V (except C1 should be 25V)
   - Ensure proper polarity during assembly

### Signal Connections

**From xNAV650 (J2) to Circuit:**
- Pin 3: Serial RX (RS232) → U2
- Pin 4: Serial TX (RS232) → U2
- Pin 12: PPS (3.3V isolated) → U4 buffer
- Pins 5-8: Ethernet (pass-through to J4)
- Pins 1-2, 14-15: Supply+ and Supply- (12V power)

**To Ouster OS1 (via J4):**
- NMEA_TX: TTL 5V from U2 R1OUT
- SYNC_PULSE_IN: Buffered 5V PPS from U4
- Ethernet: Pins 1-2, 3-6, 4-5, 7-8 (standard pinout)

---

## Assembly Notes

1. **Component Orientation:**
   - Pay attention to IC pin 1 indicators
   - Electrolytic capacitors have polarity markings
   - LED has polarity (longer lead = anode/+)

2. **Soldering Order:**
   - Start with lowest profile components (resistors)
   - Then ICs (or sockets if using)
   - Capacitors next
   - Connectors last

3. **Testing Before Connection:**
   - Verify 12V input polarity
   - Measure 3.3V output from U3 before connecting ICs
   - Check continuity on ethernet pass-through

4. **Strain Relief:**
   - Use cable ties or clamps for all external cables
   - Ensure no mechanical stress on PCB connectors

---

## Recommended Suppliers & Part Numbers

### Mouser/Digikey Part Numbers:

| Component | Manufacturer Part # | Supplier Part # |
|-----------|-------------------|-----------------|
| MAX3232CPE | MAX3232CPE+ | Mouser: 700-MAX3232CPE |
| 74HC125N | 74HC125N | Mouser: 771-74HC125N |
| OKI-78SR-3.3/1.5-W36-C | OKI-78SR-3.3/1.5-W36-C | Mouser: 811-OKI-78SR-3.3/1.5W36C |
| Micro-D 15-pin | Varies by manufacturer | Amphenol, Norcomp, etc. |
| RJ45 Shielded | Amphenol 54602-x08 | Check specific variant needed |

---

## Cost Estimate (Approximate, USD)

| Category | Estimated Cost |
|----------|---------------|
| ICs (U2, U3, U4) | $15 - $25 |
| Capacitors (5×) | $3 - $5 |
| Resistors (2×) | $0.50 - $1 |
| Connectors (J1, J2, J4) | $10 - $20 |
| PCB (prototype, single unit) | $20 - $50 |
| Enclosure + hardware | $10 - $30 |
| Cables & misc | $15 - $30 |
| **Total per unit** | **$75 - $160** |

*Bulk pricing will significantly reduce per-unit costs.*

---

## Revision History

| Rev | Date | Changes | Author |
|-----|------|---------|--------|
| 1.0 | 2025-11-14 | Initial release | Vladyslav Hirchuk |

---

## Additional Resources

- [xNAV650 Hardware Manual](https://www.datrontechnology.co.uk/wp-content/uploads/2021/03/xNAV650-manual-210311.pdf)
- [Ouster OS1 Documentation](https://ouster.com/downloads)
- [MAX3232 Datasheet](https://www.ti.com/product/MAX3232)
- [OKI-78SR Datasheet](https://www.murata.com/products/productdata/8807031734302/oki-78sr.pdf)

---