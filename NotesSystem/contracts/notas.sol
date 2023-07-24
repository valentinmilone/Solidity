// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

    contract notas {

        // Direccion del profesor
        address public profesor;

        // Constructor
        constructor () {
            profesor = msg.sender;
        }

        mapping (bytes32 => uint) Notas;

        // Mapping de los alumnos que pidan revisión de examen para una asignatura
        mapping (string => string[]) revisiones;

        // Eventos
        event alumno_evaluado(bytes32);
        event evento_revision(string);


        // Function para evaluar a alumnos
        function Evaluar(string memory _asignatura, string memory _idAlumno, uint _nota) public UnicamenteProfesor(msg.sender){
            //Hash de la identificacion del alumno

            bytes32 hash_idAlumno = keccak256(abi.encodePacked(_asignatura, _idAlumno));
            // Relacion entre el hash de la identificacion del alumno y su nota

            Notas[hash_idAlumno] = _nota;
            // Emision del evento
            emit alumno_evaluado(hash_idAlumno);
        }

        // Control de las unciones ejecutables por el profesor
        modifier UnicamenteProfesor(address _direccion){
            //Requiere que la direccion introducida por parametro sea igual al owner del contrato
            require(_direccion == profesor, "No tienes permisos para ejecutar esta funcion.");
            _;
        }

        // Función para ver las notas 

        function VerNotas(string memory _asignatura, string memory _idAlumno) public view returns(uint) {
        bytes32 hash_idAlumno = keccak256(abi.encodePacked(_asignatura, _idAlumno));   
        //Nota asociada al hash del alumno 
        uint nota_alumno = Notas[hash_idAlumno];
        // Visualizar la nota con el return
        return nota_alumno;
        }
        // Función para solicitar una revisión

        function Revision(string memory _asignatura, string memory _idAlumno) public {
            // Almacenamiento de la entidad de un alumno en Array
            revisiones[_asignatura].push(_idAlumno);
            // Emisión del evento
            emit evento_revision(_idAlumno);
        }

        // Función para ver los alumnos que han solicitado revisión de examen
        function VerRevisiones(string memory _asignatura) public view UnicamenteProfesor(msg.sender) returns (string [] memory){
            // Devolver las entidades de los alumnos
            return revisiones[_asignatura]; 

        }
}