import { Card, Button } from 'react-native-paper'
import { StyleSheet, Text } from 'react-native'

export default function RecipeCard({ recipe }) {
    return (
        <Card style={styles.card}>
            <Card.Cover source={{ uri: recipe.image }} />
            <Card.Title title={recipe.label} titleVariant="titleLarge" />
            <Card.Content>
                <Text>{recipe.ingredientLines.join('\n')}</Text>
            </Card.Content>
            <Card.Actions>
                <Button onPress={() => console.log('open bottom sheet!')} icon="heart">
                    Save
                </Button>
                <Button onPress={() => console.log('open bottom sheet!')} icon="link">
                    Open
                </Button>
            </Card.Actions>
        </Card>
    )
}

const styles = StyleSheet.create({
    card: {
        marginBottom: 10
    }
})
