import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';

import Buttons from '../Buttons/Button';
import * as Constantes from '../../utils/constantes';

const ModalEditarAdministrador = ({ setModalVisible, modalVisible, idAdministrador, setNombreAdministrador, setApellidoAdministrador, setCorreoAdministrador, setAliasAdministrador, nombreAdministrador, apellidoAdministrador, correoAdministrador, aliasAdministrador, getAdministrador }) => {

    const ip = Constantes.IP;

    const handleUpdateAdministrador = async () => {
        try {


            const formData = new FormData();
            formData.append('idAdministrador', idAdministrador);
            formData.append('nombreAdministrador', nombreAdministrador);
            formData.append('apellidoAdministrador', apellidoAdministrador);
            formData.append('correoAdministrador', correoAdministrador);
            formData.append('aliasAdministrador', aliasAdministrador);

            const response = await fetch(`${ip}/coffeeshop/api/services/admin/administrador.php?action=updateRow`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (data.status) {
                Alert.alert('Se actualizo el administrador');
                getDetalleCarrito();
            } else {
                Alert.alert('Error al editar administrador', data.error);
            }
            setModalVisible(false);
        } catch (error) {
            Alert.alert("Error en editar administrador", error);
            setModalVisible(false);
        }
    };

    const handleCancelEditarAdmin = () => {
        setModalVisible(false);
    };

    return (
        <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Edite administrador</Text>
                    <TextInput
                        style={styles.input}
                        value={nombreAdministrador}
                        onChangeText={setNombreAdministrador}
                        keyboardType="text"
                        placeholder="Ingrese nombre"
                    />
                    <TextInput
                        style={styles.input}
                        value={apellidoAdministrador}
                        onChangeText={setApellidoAdministrador}
                        keyboardType="text"
                        placeholder="Ingrese apellido"
                    />
                    <TextInput
                        style={styles.input}
                        value={correoAdministrador}
                        onChangeText={setCorreoAdministrador}
                        keyboardType="text"
                        placeholder="Ingrese correo"
                    />
                    <TextInput
                        style={styles.input}
                        value={aliasAdministrador}
                        onChangeText={setAliasAdministrador}
                        keyboardType="text"
                        placeholder="Ingrese alias"
                    />
                    <Buttons
                        textoBoton='Editar administrador'
                        accionBoton={handleUpdateAdministrador}
                    />
                    <Buttons
                        textoBoton='Cancelar'
                        accionBoton={handleCancelEditarAdmin}
                    />
                </View>
            </View>
        </Modal>
    );
};

export default ModalEditarAdministrador;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        width: 200,
    },
    button: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
