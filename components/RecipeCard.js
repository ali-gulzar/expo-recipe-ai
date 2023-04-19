import { Card } from 'react-native-paper'
import { StyleSheet } from 'react-native'

export default function RecipeCard({ recipe }) {
    return (
        <Card style={styles.card}>
            <Card.Cover source={{ uri: recipe.image }} />
        </Card>
    )
}

const styles = StyleSheet.create({
    card: {
        marginBottom: 10
    }
})
