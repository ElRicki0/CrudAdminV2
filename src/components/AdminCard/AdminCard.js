import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, FlatList, Alert } from 'react-native';
import Constants from 'expo-constants';
import * as Constantes from '../../utils/constantes'

const AdminCard = ({ item, accionBotonDetalle, updateDataDetalleAdmin }) => {

    const ip = Constantes.IP;

    const handleDeleteDetalleAdmin = async (idAdministrador) => {
        try {
            // Mostrar un mensaje de confirmación antes de eliminar
            Alert.alert(
                'Confirmación',
                '¿Estás seguro de que deseas eliminar este administrador?',
                [
                    {
                        text: 'Cancelar',
                        style: 'cancel'
                    },
                    {
                        text: 'Eliminar',
                        onPress: async () => {
                            const formData = new FormData();
                            formData.append('idAdministrador', idAdministrador);
                            const response = await fetch(`${ip}/coffeeshop/api/services/admin/administrador.php?action=deleteRow`, {
                                method: 'POST',
                                body: formData
                            });
                            const data = await response.json();
                            if (data.status) {
                                Alert.alert('Administrador eliminado correctamente');
                                // Llamar a la función de actualización para actualizar la lista
                                updateDataDetalleAdmin(prevData => prevData.filter(item => item.id_administrador !== idAdministrador));
                            } else {
                                Alert.alert('Error al eliminar administrador', data.error);
                            }
                        }
                    }
                ]
            );
        } catch (error) {
            Alert.alert("Error al eliminar administrador")
        }
    };

    return (
        <View style={styles.itemContainer}>

            <Text style={styles.itemText}>ID: {item.id_administrador}</Text>
            <Text style={styles.itemText}>Nombre: {item.nombre_administrador}</Text>
            <Text style={styles.itemText}>Apellido: ${item.apellido_administrador}</Text>
            <Text style={styles.itemText}>Correo: {item.correo_administrador}</Text>
            <Text style={styles.itemText}>Alias: {item.alias_administrador}</Text>

            <TouchableOpacity style={styles.modifyButton}
                onPress={() => accionBotonDetalle(item.id_administrador, item.nombre_administrador, item.apellido_administrador,
                    item.correo_administrador, item.alias_administrador)}
            >
                <Text style={styles.buttonText}>Modificar Administrador</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteButton}
                onLongPress={() => handleDeleteDetalleAdmin(item.id_administrador)}
            >
                <Text style={styles.buttonText}>Eliminar administrador</Text>
            </TouchableOpacity>
        </View>

    );
};

export default AdminCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EAD8C0',
        paddingTop: Constants.statusBarHeight,
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 16,
        color: '#5C3D2E', // Brown color for the title
    },
    itemContainer: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    itemText: {
        fontSize: 16,
        marginBottom: 4,
        color: '#333',
    },
    modifyButton: {
        borderWidth: 1,
        borderColor: '#8F6B58',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#8F6B58', // Light brown color for modify button
        marginVertical: 4,
    },
    deleteButton: {
        borderWidth: 1,
        borderColor: '#D2691E',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#D2691E', // Darker orange color for delete button
        marginVertical: 4,
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 16,
    },
    finalButton: {
        backgroundColor: '#A0522D', // Sienna color for final action buttons
        padding: 16,
        borderRadius: 8,
        marginVertical: 8,
    },
    finalButtonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    containerButtons: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});
