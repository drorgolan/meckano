# Define Docker Hub repository
$dockerUser = "drorgolan"
$repository = "meckano"

# Define images with their IDs and desired tags
$images = @(
    @{ ID = "518a1672569e"; Tag = "frontend-latest" }
    @{ ID = "c88d5f23d857"; Tag = "backend-latest" }
    @{ ID = "933569f3a9f6"; Tag = "phpmyadmin-latest" }
    @{ ID = "6bb891430fb6"; Tag = "mysql-5.7.22" }
)

# Loop through each image and push it to Docker Hub with the specified tag
foreach ($image in $images) {
    $imageId = $image.ID
    $tagName = $image.Tag
    $repoTag = "$dockerUser/$repository:$tagName"

    Write-Output "Tagging image $imageId as $repoTag"
    docker tag $imageId $repoTag

    Write-Output "Pushing image $repoTag"
    docker push $repoTag
}