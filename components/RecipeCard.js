import { Card, Button } from 'react-native-paper'
import { StyleSheet, Text } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import { saveRecipe } from '../api/user'

export default function RecipeCard({ recipe, accessToken }) {
    const handleSave = () => {
        const recipeId = recipe.uri.split('#recipe_')[1]
        saveRecipe(recipeId, accessToken)
            .then((response) => console.log(response.data))
            .catch((error) => console.error(error.response.data))
    }

    return (
        <Card style={styles.card}>
            <Card.Cover source={{ uri: recipe.image }} />
            <Card.Title title={recipe.label} titleVariant="titleLarge" />
            <Card.Content>
                <Text>{recipe.ingredientLines.join('\n')}</Text>
            </Card.Content>
            <Card.Actions>
                <Button onPress={handleSave} icon="heart">
                    Save
                </Button>
                <Button onPress={() => WebBrowser.openBrowserAsync(recipe.url)} icon="link">
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
