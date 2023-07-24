// Llamada al contrato del Sistema Universitario.
const notas = artifacts.require('notas');

contract('notas', accounts => {
    it('1. Función Evaluar(string_asignatura string memory _idAlumno, uint _nota)', async () => {
        // Smart Contract Desplegado
        let instance = await notas.deployed();
        // Llamada al método de evaluación del Smart Contract 
        const tx1 = await instance.Evaluar('Matematicas','12345x', 9, {from: accounts[0]});
        const tx2 = await instance.Evaluar('Biologia','12345x', 8, {from: accounts[0]});
        // Imprimir valores
        console.log(accounts[0]); // Dirección del profesor
        console.log(tx1); // Transaccion de la evaluacion academica de Matematicas
        console.log(tx2); // Transaccion de la evaluacion academica de Biologias
        // Comprobación de la información de la Blockchain
        const nota_alumno_matematicas = await instance.VerNotas.call('Matematicas','12345x', {from: accounts[1]});
        const nota_alumno_biologia = await instance.VerNotas.call('Biologia','12345x', {from: accounts[1]});
        // Condición para pasar el test : test_alumno = 9
        console.log('nota_alumno');
        assert.equal(nota_alumno_matematicas, 9);
        assert.equal(nota_alumno_biologia, 8);
    });

    it('2. Función: Revisión (string memory _idAlumno)', async () => {
        let instance = await notas.deployed();
        // Llamada al método de revisar exámenes
        const evaluacion_maria = await instance.Evaluar('Musica','12345x', 5, {from: accounts[0]});
        console.log(evaluacion_maria);
        const rev1 = await instance.Revision('Matematicas','12345x', {from: accounts[1]});
        const rev2 = await instance.Revision('Musica', '02486T', {from: accounts[1]});
        // Imprimir los valores recibidos de la revisión
        console.log(rev1);
        console.log(rev2);
        // Verificación del test
        const id_alumno_matematicas = await instance.VerRevisiones.call('Matematicas', {from: accounts[0]})
        const id_alumno_musica = await instance.VerRevisiones.call('Musica', {from: accounts[0]})
        console.log(id_alumno_matematicas);
        console.log(id_alumno_musica);
        // Comprobación de los datos de las revisiones
        assert.equal(id_alumno_matematicas[0], '12345x');
        assert.equal(id_alumno_musica[0], '02486T');

    });
});
