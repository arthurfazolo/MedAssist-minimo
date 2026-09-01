# Security Specifications - MedAssist

## Data Invariants

1. **Protocol Integrity**: A ClinicalProtocol cannot have an invalid ID, and its fields (id, titulo, categoria, descricao, status, nos) must conform strictly to expected sizes and types.
2. **Medication Catalog**: Medications details must conform strictly to the Medication schema. Non-admin users cannot write/update medications.
3. **Template Authoring**: Medical prescriptions are shared templates that can only be authored or edited by authorized administrators.
4. **Admin Protection**: Admin designations cannot be written self-service unless authorized (preventing privilege escalation via identity spoofing).

---

## The "Dirty Dozen" Payloads

Here are twelve payloads designed to test and attempt to break the rules:

### 1. Privilege Escalation - Self-Assigned Admin Access (Identity Spoofing)
An unverified user attempts to create their own admin configuration document.
```json
// Path: /admins/unauthorized_user_uid
{
  "isAdmin": true,
  "email": "malicious@attacker.com"
}
```

### 2. Orphaned Write - Protocol with Invalid ID Schema (ID Poisoning/Resource Exhaustion)
An attacker attempts to write a protocol using a generic path containing 256 junk characters.
```json
// Path: /protocols/invalid-character-$$$-long-id...
{
  "id": "invalid-character-$$$-long-id...",
  "titulo": "Malicious Protocol",
  "categoria": "Emergency",
  "descricao": "Junk",
  "status": "construcao",
  "nos": []
}
```

### 3. State Bypass - Write Protocol with Missing Required Fields (Type Safety Verification)
An administrator accounts with incomplete data tries to write an invalid protocol schema.
```json
// Path: /protocols/validprotcol1
{
  "id": "validprotcol1",
  "titulo": "Missing Categorias"
}
```

### 4. Injection Attack - Protocol Title Overflow (Size Validation Test)
An attacker attempts to write a protocol with an enormously long title (e.g., 10,000 characters) to exhaust storage.
```json
// Path: /protocols/validprotocol2
{
  "id": "validprotocol2",
  "titulo": "A... [10,000 characters] ...Z",
  "categoria": "Pediatria",
  "descricao": "Description",
  "status": "construcao",
  "nos": []
}
```

### 5. Medication Spoof - Non-Admin Medication Creation (RBAC Violation)
A standard patient or physician user attempts to alter the list of medications.
```json
// Path: /medications/paracetamol-malicious
{
  "id": "paracetamol-malicious",
  "genericName": "Paracetamol Malicioso",
  "pharmacologicalClass": "Analgesico",
  "presentations": [],
  "usualDoses": {},
  "commercialNames": [],
  "susAvailability": true,
  "costIndicator": "$"
}
```

### 6. Prescription Poisoning - Unauthorized Prescription Update (RBAC Violation)
A non-admin subscriber attempts to modify a global prescription template.
```json
// Path: /prescriptions/prescription-id-1
{
  "id": "prescription-id-1",
  "title": "Poisoned Prescription Template",
  "category": "Cardio",
  "content": "Malicious content override."
}
```

### 7. Calculator Manipulation - Creating Custom Formula (RBAC Violation)
An unauthorized user attempts to insert a malicious formula in a calculator.
```json
// Path: /calculators/calc-id-1
{
  "id": "calc-id-1",
  "name": "Malicious Calculator",
  "description": "Exploit formula",
  "category": "Standard",
  "inputs": [],
  "formula": "dangerouslyEvalCode()"
}
```

### 8. System-Only Modification - Shadow Update of admin attribute (Privilege Gatekeeper)
An administrative account attempts to change a user's admin fields without proper schema assertions.
```json
// Path: /admins/user_uid_1
{
  "isAdmin": true,
  "email": "changed@admin.com"
}
```

### 9. Temporal Corruption - Backdated Timestamp Write (Time Integrity)
An attacker tries to upload a document manipulating `createdAt` or `updatedAt` to bypass sync.
```json
// Path: /protocols/temp-corr-1
{
  "id": "temp-corr-1",
  "titulo": "Backdated time rule",
  "categoria": "General",
  "descricao": "Description",
  "status": "construcao",
  "nos": [],
  "createdAt": "1999-01-01T00:00:00Z"
}
```

### 10. Blanket Access Scrape - Reading Admins from Unauthenticated Connection
An unauthenticated request is fired to list the contents of the root `/admins` path.
```json
// GET /admins
```

### 11. Malformed Type Insertion - Float into Integer Fields or string when array required
Trying to inject string value to and array field `nos`.
```json
// Path: /protocols/protocol-id-string-nos
{
  "id": "protocol-id-string-nos",
  "titulo": "Nice Title",
  "categoria": "Obstetrics",
  "descricao": "Description",
  "status": "construcao",
  "nos": "this-should-be-an-array-but-its-a-string"
}
```

### 12. Immutability Violation - Custom Calculator ID Mutated
Attempting to update a calculator but changing its core `id` field.
```json
// Path: /calculators/calc1
// Incoming payload has mismatched id
{
  "id": "calc-mismatched",
  "name": "New Name",
  "description": "Description",
  "category": "Infectology",
  "inputs": [],
  "formula": "x + 1"
}
```

---

## Test Runner Verification Suite Plan

A test runner verification is planned to validate that all structural paths and write attempts in "Dirty Dozen" represent permission denial vectors.
